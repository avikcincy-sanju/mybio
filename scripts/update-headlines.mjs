import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const OUTPUT = path.resolve('public/headlines.json');
const MAX_HEADLINES = 10;
const MAX_AGE_DAYS = 60;
const FUTURE_TOLERANCE_HOURS = 6;

const feeds = [
  {
    url: 'https://www.finextra.com/rss/channel.aspx?channel=payments',
    defaultCategory: 'Payments',
    source: 'Finextra',
  },
  {
    url: 'https://www.finextra.com/rss/channel.aspx?channel=ai',
    defaultCategory: 'AI & Fintech',
    source: 'Finextra',
  },
  {
    url: 'https://www.finextra.com/rss/channel.aspx?channel=crypto',
    defaultCategory: 'Stablecoins & Digital Money',
    source: 'Finextra',
  },
];

const domainPatterns = [
  /\bpayments?\b/i,
  /\bmerchant(s)?\b/i,
  /\bacquir(e|er|ing|ers)\b/i,
  /\bpayment acceptance\b/i,
  /\bcheckout\b/i,
  /\bcard(s)?\b/i,
  /\bdebit\b/i,
  /\bcredit\b/i,
  /\bpoint[- ]of[- ]sale\b/i,
  /\bpay[- ]by[- ]bank\b/i,
  /\bopen banking\b/i,
  /\bstablecoin(s)?\b/i,
  /\btokeni[sz]ed deposit(s)?\b/i,
  /\bdigital currenc(y|ies)\b/i,
  /\bsettlement\b/i,
  /\btreasury\b/i,
  /\bliquidity\b/i,
  /\bcross[- ]border\b/i,
  /\bremittance(s)?\b/i,
  /\bforeign exchange\b/i,
  /\bfx\b/i,
  /\bpayment orchestration\b/i,
  /\breal[- ]time payments?\b/i,
  /\binstant payments?\b/i,
  /\bfednow\b/i,
  /\brtp\b/i,
  /\bswift\b/i,
  /\biso\s*20022\b/i,
  /\bwallet(s)?\b/i,
  /\bembedded finance\b/i,
  /\bpayment platform(s)?\b/i,
  /\bpayment infrastructure\b/i,
  /\bagentic commerce\b/i,
  /\bautonomous (payment|commerce|financial)\b/i,
];

const aiPattern = /\b(ai|artificial intelligence|machine learning|agentic)\b/i;
const financialContextPattern = /\b(payment|merchant|commerce|bank|banking|financial|fintech|treasury|settlement|wallet|card|fraud)\b/i;

const excludedTitlePatterns = [
  /\bwebinar\b/i,
  /\bconference\b/i,
  /\bsummit\b/i,
  /\bworkshop\b/i,
  /\bregister now\b/i,
  /\bjoin us\b/i,
  /\bupcoming event\b/i,
  /\bevent agenda\b/i,
  /\bawards? ceremony\b/i,
];

const excludedPathPatterns = [
  /\/event-info\//i,
  /\/events?\//i,
  /\/webinars?\//i,
  /\/conference\//i,
];

function decodeXml(value = '') {
  return value
    .replace(/^<!\[CDATA\[/, '')
    .replace(/\]\]>$/, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, value) => String.fromCodePoint(Number(value)))
    .replace(/&#x([0-9a-f]+);/gi, (_, value) => String.fromCodePoint(Number.parseInt(value, 16)))
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function element(item, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = item.match(
    new RegExp(`<${escapedName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedName}>`, 'i'),
  );
  return decodeXml(match?.[1] ?? '');
}

function normalizeUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
      url.searchParams.delete(key);
    });
    url.hash = '';
    return url.toString();
  } catch {
    return '';
  }
}

function inferCategory(title, fallback) {
  if (/stablecoin|tokeni[sz]ed deposit|digital currency|crypto/i.test(title)) {
    return 'Stablecoins & Digital Money';
  }
  if (/agentic|artificial intelligence|\bai\b|machine learning/i.test(title)) {
    return 'AI & Agentic Commerce';
  }
  if (/merchant|acquir|checkout|acceptance|\bcard|debit|credit|point[- ]of[- ]sale/i.test(title)) {
    return 'Merchant Payments';
  }
  if (/cross[- ]border|treasury|settlement|liquidity|remittance|foreign exchange|\bfx\b/i.test(title)) {
    return 'Settlement & Treasury';
  }
  if (/real[- ]time|instant payment|fednow|\brtp\b|iso\s*20022|swift/i.test(title)) {
    return 'Payment Infrastructure';
  }
  return fallback || 'Payments & Fintech';
}

function parseRss(xml, feed) {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];

  return items
    .map((item) => {
      const title = element(item, 'title');
      const url = normalizeUrl(element(item, 'link') || element(item, 'guid'));
      const rawDate = element(item, 'pubDate') || element(item, 'dc:date');
      const parsedDate = rawDate ? new Date(rawDate) : new Date(Number.NaN);
      const timestamp = parsedDate.getTime();
      const category = inferCategory(title, element(item, 'category') || feed.defaultCategory);

      return {
        category,
        title,
        source: feed.source,
        date: Number.isNaN(timestamp)
          ? 'Recent'
          : parsedDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              timeZone: 'UTC',
            }),
        url,
        timestamp: Number.isNaN(timestamp) ? 0 : timestamp,
      };
    })
    .filter((item) => item.title && item.url);
}

function isDeepArticleUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const pathName = url.pathname.replace(/\/+$/, '');
    return pathName.length > 1;
  } catch {
    return false;
  }
}

function isEventOrPromotion(item) {
  if (excludedTitlePatterns.some((pattern) => pattern.test(item.title))) return true;

  try {
    const url = new URL(item.url);
    return excludedPathPatterns.some((pattern) => pattern.test(url.pathname));
  } catch {
    return true;
  }
}

function isRelevant(item) {
  const text = `${item.title} ${item.category}`;
  const directDomainMatch = domainPatterns.some((pattern) => pattern.test(text));
  const contextualAiMatch = aiPattern.test(text) && financialContextPattern.test(text);
  return directDomainMatch || contextualAiMatch;
}

function isCurrent(item, now = Date.now()) {
  if (!item.timestamp) return false;

  const futureLimit = now + FUTURE_TOLERANCE_HOURS * 60 * 60 * 1000;
  const oldestAllowed = now - MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
  return item.timestamp <= futureLimit && item.timestamp >= oldestAllowed;
}

function isEligible(item, now = Date.now()) {
  return (
    item &&
    item.title &&
    item.url &&
    isDeepArticleUrl(item.url) &&
    !isEventOrPromotion(item) &&
    isRelevant(item) &&
    isCurrent(item, now)
  );
}

async function fetchFeed(feed) {
  const response = await fetch(feed.url, {
    headers: {
      'user-agent': 'Avik-Nandi-Portfolio-Headline-Refresh/2.0',
      accept: 'application/rss+xml, application/xml, text/xml, */*',
    },
    signal: AbortSignal.timeout(20_000),
  });

  if (!response.ok) {
    throw new Error(`${feed.source} feed returned HTTP ${response.status}`);
  }

  return parseRss(await response.text(), feed);
}

async function readExisting() {
  try {
    return JSON.parse(await readFile(OUTPUT, 'utf8'));
  } catch {
    return { updatedAt: '', headlines: [] };
  }
}

function normalizeExisting(item) {
  const rawTimestamp = item?.timestamp || Date.parse(item?.date ?? '');
  return {
    category: item?.category || 'Payments & Fintech',
    title: item?.title || '',
    source: item?.source || 'Industry Source',
    date: item?.date || 'Recent',
    url: normalizeUrl(item?.url || ''),
    timestamp: Number.isNaN(rawTimestamp) ? 0 : rawTimestamp,
  };
}

function deduplicate(items) {
  const unique = [];
  const seenUrls = new Set();
  const seenTitles = new Set();

  for (const item of items) {
    const urlKey = item.url.toLowerCase();
    const titleKey = item.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    if (!urlKey || !titleKey || seenUrls.has(urlKey) || seenTitles.has(titleKey)) continue;

    seenUrls.add(urlKey);
    seenTitles.add(titleKey);
    unique.push(item);

    if (unique.length >= MAX_HEADLINES) break;
  }

  return unique;
}

const now = Date.now();
const existing = await readExisting();
const results = await Promise.allSettled(feeds.map(fetchFeed));
const fetched = results.flatMap((result) => (result.status === 'fulfilled' ? result.value : []));

for (const result of results) {
  if (result.status === 'rejected') {
    console.warn(result.reason?.message ?? result.reason);
  }
}

const freshCandidates = fetched
  .filter((item) => isEligible(item, now))
  .sort((a, b) => b.timestamp - a.timestamp);

const existingCandidates = (existing.headlines ?? [])
  .map(normalizeExisting)
  .filter((item) => isEligible(item, now))
  .sort((a, b) => b.timestamp - a.timestamp);

const unique = deduplicate([...freshCandidates, ...existingCandidates]);

if (unique.length === 0) {
  console.warn('No eligible industry headlines were available; keeping the current file unchanged.');
  process.exit(0);
}

const headlines = unique.map(({ category, title, source, date, url }) => ({
  category,
  title,
  source,
  date,
  url,
}));

await writeFile(
  OUTPUT,
  `${JSON.stringify({ updatedAt: new Date().toISOString(), headlines }, null, 2)}\n`,
);

console.log(`Updated ${OUTPUT} with ${headlines.length} filtered headlines.`);

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const OUTPUT = path.resolve('public/headlines.json');
const MAX_HEADLINES = 10;

const feeds = [
  { url: 'https://www.finextra.com/rss/channel.aspx?channel=payments', defaultCategory: 'Payments', source: 'Finextra' },
  { url: 'https://www.finextra.com/rss/channel.aspx?channel=ai', defaultCategory: 'AI & Fintech', source: 'Finextra' },
  { url: 'https://www.finextra.com/rss/channel.aspx?channel=crypto', defaultCategory: 'Stablecoins & Crypto', source: 'Finextra' }
];

const priorityKeywords = [
  'payment', 'merchant', 'acquir', 'stablecoin', 'agentic', 'commerce',
  'settlement', 'treasury', 'cross-border', 'orchestration', 'real-time',
  'token', 'wallet', 'bank', 'fintech', 'artificial intelligence', ' ai '
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
    .replace(/<[^>]+>/g, '')
    .trim();
}

function element(item, name) {
  const match = item.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i'));
  return decodeXml(match?.[1] ?? '');
}

function parseRss(xml, feed) {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
  return items.map((item) => {
    const title = element(item, 'title');
    const url = element(item, 'link') || element(item, 'guid');
    const rawDate = element(item, 'pubDate') || element(item, 'dc:date');
    const parsedDate = rawDate ? new Date(rawDate) : new Date(0);
    const category = element(item, 'category') || feed.defaultCategory;

    return {
      category,
      title,
      source: feed.source,
      date: Number.isNaN(parsedDate.getTime())
        ? rawDate || 'Recent'
        : parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }),
      url,
      timestamp: Number.isNaN(parsedDate.getTime()) ? 0 : parsedDate.getTime()
    };
  }).filter((item) => item.title && item.url);
}

function relevant(item) {
  const text = ` ${item.title.toLowerCase()} `;
  return priorityKeywords.some((keyword) => text.includes(keyword));
}

async function fetchFeed(feed) {
  const response = await fetch(feed.url, {
    headers: { 'user-agent': 'Avik-Nandi-Portfolio-Headline-Refresh/1.0' },
    signal: AbortSignal.timeout(20000)
  });
  if (!response.ok) throw new Error(`${feed.source} feed returned HTTP ${response.status}`);
  return parseRss(await response.text(), feed);
}

async function readExisting() {
  try {
    return JSON.parse(await readFile(OUTPUT, 'utf8'));
  } catch {
    return { updatedAt: '', headlines: [] };
  }
}

const existing = await readExisting();
const results = await Promise.allSettled(feeds.map(fetchFeed));
const fetched = results.flatMap((result) => result.status === 'fulfilled' ? result.value : []);

for (const result of results) {
  if (result.status === 'rejected') console.warn(result.reason?.message ?? result.reason);
}

const candidates = [...fetched.filter(relevant), ...fetched]
  .sort((a, b) => b.timestamp - a.timestamp);

const unique = [];
const seen = new Set();
for (const item of candidates) {
  const key = `${item.url}|${item.title.toLowerCase()}`;
  if (seen.has(key)) continue;
  seen.add(key);
  unique.push({ category: item.category, title: item.title, source: item.source, date: item.date, url: item.url });
  if (unique.length >= MAX_HEADLINES) break;
}

if (unique.length < 3) {
  console.warn('Too few fresh headlines were available; keeping the existing feed.');
  process.exit(0);
}

await writeFile(OUTPUT, `${JSON.stringify({ updatedAt: new Date().toISOString(), headlines: unique }, null, 2)}\n`);
console.log(`Updated ${OUTPUT} with ${unique.length} headlines.`);

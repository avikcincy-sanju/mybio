import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const OUTPUT = path.resolve('public/zenodo-records.json');
const RECORD_IDS = ['21400904', '20261877', '20261969', '20315696', '20599540', '20140629'];

async function readExisting() {
  try {
    return JSON.parse(await readFile(OUTPUT, 'utf8'));
  } catch {
    return { updatedAt: '', records: [] };
  }
}

function cleanText(value = '') {
  return String(value)
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractYear(value) {
  if (!value) return '';
  const directMatch = String(value).match(/\b(19|20)\d{2}\b/);
  if (directMatch) return directMatch[0];

  const parsedDate = new Date(value);
  return Number.isNaN(parsedDate.getTime()) ? '' : String(parsedDate.getUTCFullYear());
}

function extractResourceType(resourceType) {
  if (!resourceType) return 'Research';
  if (typeof resourceType === 'string') return cleanText(resourceType) || 'Research';

  return (
    cleanText(resourceType.title) ||
    cleanText(resourceType.type) ||
    cleanText(resourceType.subtype) ||
    'Research'
  );
}

function normalizeExisting(record, recordId) {
  return {
    title: cleanText(record?.title) || `Zenodo Record ${recordId}`,
    record: recordId,
    // Keep every Zenodo-tab click on Zenodo, even when the metadata DOI points elsewhere.
    url: `https://zenodo.org/records/${recordId}`,
    type: cleanText(record?.type) || 'Research',
    year: cleanText(record?.year),
    doi: cleanText(record?.doi) || `10.5281/zenodo.${recordId}`,
  };
}

async function fetchRecord(recordId) {
  const response = await fetch(`https://zenodo.org/api/records/${recordId}`, {
    headers: {
      'user-agent': 'Avik-Nandi-Portfolio-Zenodo-Refresh/2.0',
      accept: 'application/json',
    },
    signal: AbortSignal.timeout(20_000),
  });

  if (!response.ok) {
    throw new Error(`Zenodo record ${recordId} returned HTTP ${response.status}`);
  }

  const data = await response.json();
  const metadata = data.metadata ?? {};
  const publicationDate = metadata.publication_date ?? data.created ?? data.updated ?? '';
  const doi = cleanText(metadata.doi ?? data.doi ?? `10.5281/zenodo.${recordId}`);

  return {
    title: cleanText(metadata.title) || `Zenodo Record ${recordId}`,
    record: recordId,
    // The card belongs to the Zenodo tab, so always open the canonical Zenodo record page.
    url: `https://zenodo.org/records/${recordId}`,
    type: extractResourceType(metadata.resource_type),
    year: extractYear(publicationDate),
    doi,
  };
}

const existing = await readExisting();
const existingById = new Map(
  (existing.records ?? []).map((record) => [String(record.record), record]),
);

const results = await Promise.allSettled(RECORD_IDS.map(fetchRecord));
const records = [];

results.forEach((result, index) => {
  const recordId = RECORD_IDS[index];

  if (result.status === 'fulfilled') {
    records.push(result.value);
    return;
  }

  console.warn(result.reason?.message ?? result.reason);
  const fallback = existingById.get(recordId);
  if (fallback) records.push(normalizeExisting(fallback, recordId));
});

if (records.length === 0) {
  console.warn('No Zenodo metadata was available; keeping the current file unchanged.');
  process.exit(0);
}

await writeFile(
  OUTPUT,
  `${JSON.stringify({ updatedAt: new Date().toISOString(), records }, null, 2)}\n`,
);

console.log(`Updated ${OUTPUT} with ${records.length} records.`);

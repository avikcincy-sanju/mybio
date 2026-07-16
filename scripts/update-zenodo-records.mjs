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

async function fetchRecord(recordId) {
  const response = await fetch(`https://zenodo.org/api/records/${recordId}`, {
    headers: { 'user-agent': 'Avik-Nandi-Portfolio-Zenodo-Refresh/1.0' },
    signal: AbortSignal.timeout(20000)
  });
  if (!response.ok) throw new Error(`Zenodo record ${recordId} returned HTTP ${response.status}`);
  const data = await response.json();
  const metadata = data.metadata ?? {};
  const publicationDate = metadata.publication_date ?? data.created ?? '';
  const year = publicationDate ? String(new Date(publicationDate).getUTCFullYear()) : '';
  const doi = metadata.doi ?? `10.5281/zenodo.${recordId}`;
  const type = metadata.resource_type?.title ?? metadata.resource_type?.type ?? 'Research';

  return {
    title: metadata.title ?? `Zenodo Record ${recordId}`,
    record: recordId,
    url: metadata.doi ? `https://doi.org/${metadata.doi}` : `https://zenodo.org/records/${recordId}`,
    type,
    year,
    doi
  };
}

const existing = await readExisting();
const results = await Promise.allSettled(RECORD_IDS.map(fetchRecord));
const byId = new Map((existing.records ?? []).map((record) => [record.record, record]));

results.forEach((result, index) => {
  const id = RECORD_IDS[index];
  if (result.status === 'fulfilled') byId.set(id, result.value);
  else console.warn(result.reason?.message ?? result.reason);
});

const records = RECORD_IDS.map((id) => byId.get(id)).filter(Boolean);
if (records.length === 0) {
  console.warn('No Zenodo metadata was available; keeping the current file.');
  process.exit(0);
}

await writeFile(OUTPUT, `${JSON.stringify({ updatedAt: new Date().toISOString(), records }, null, 2)}\n`);
console.log(`Updated ${OUTPUT} with ${records.length} records.`);

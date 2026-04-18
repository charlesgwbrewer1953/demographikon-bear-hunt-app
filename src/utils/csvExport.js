const CSV_COLUMNS = [
  'response_id',
  'timestamp',
  'collector_id',
  'party_support',
  'turnout_intention',
  'con_leaflet',
  'con_canvasser',
  'lab_leaflet',
  'lab_canvasser',
  'ld_leaflet',
  'ld_canvasser',
  'green_leaflet',
  'green_canvasser',
  'reform_leaflet',
  'reform_canvasser',
];

function escapeField(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

export function buildCSV(responses) {
  const header = CSV_COLUMNS.join(',');
  const rows = responses.map((record) =>
    CSV_COLUMNS.map((col) => escapeField(record[col])).join(',')
  );
  return [header, ...rows].join('\n');
}

export function downloadCSV(responses, collectorId, location) {
  const csv = buildCSV(responses);
  const date = new Date().toISOString().slice(0, 10);
  const safeId = String(collectorId || '').replace(/[^a-zA-Z0-9_-]/g, '_');
  const safeLoc = String(location || '')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_-]/g, '');
  const filename = `${safeId}_${safeLoc}_${date}.csv`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

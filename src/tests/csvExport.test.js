import { buildCSV } from '../utils/csvExport';

const EXPECTED_HEADERS = [
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

function makeSampleResponse(id) {
  return {
    response_id: id,
    timestamp: '2024-01-01T00:00:00.000Z',
    collector_id: 'collector-1',
    party_support: 'Labour',
    turnout_intention: 'I will vote',
    con_leaflet: 'No effect',
    con_canvasser: 'No effect',
    lab_leaflet: 'Bit more likely to vote',
    lab_canvasser: 'Much more likely to vote',
    ld_leaflet: 'No effect',
    ld_canvasser: 'No effect',
    green_leaflet: 'No effect',
    green_canvasser: 'No effect',
    reform_leaflet: 'No effect',
    reform_canvasser: 'No effect',
    randomized_party_order: ['lab', 'con', 'ld', 'green', 'reform'],
  };
}

describe('buildCSV', () => {
  it('produces the correct header row', () => {
    const csv = buildCSV([]);
    const header = csv.split('\n')[0];
    expect(header).toBe(EXPECTED_HEADERS.join(','));
  });

  it('produces exactly one data row per response', () => {
    const csv = buildCSV([makeSampleResponse('id-1'), makeSampleResponse('id-2')]);
    const lines = csv.split('\n');
    expect(lines).toHaveLength(3);
  });

  it('produces only a header row with zero responses', () => {
    const csv = buildCSV([]);
    const lines = csv.split('\n');
    expect(lines).toHaveLength(1);
    expect(lines[0]).toBe(EXPECTED_HEADERS.join(','));
  });

  it('does not include randomized_party_order in output', () => {
    const csv = buildCSV([makeSampleResponse('id-1')]);
    expect(csv).not.toContain('randomized_party_order');
  });

  it('places response_id in the first column', () => {
    const csv = buildCSV([makeSampleResponse('test-uuid-123')]);
    const dataRow = csv.split('\n')[1];
    expect(dataRow.split(',')[0]).toBe('test-uuid-123');
  });

  it('places collector_id in the third column', () => {
    const csv = buildCSV([makeSampleResponse('id-1')]);
    const dataRow = csv.split('\n')[1];
    expect(dataRow.split(',')[2]).toBe('collector-1');
  });

  it('wraps fields containing commas in double quotes', () => {
    const response = {
      ...makeSampleResponse('id-1'),
      party_support: 'Labour, actually',
    };
    const csv = buildCSV([response]);
    expect(csv).toContain('"Labour, actually"');
  });

  it('escapes double quotes within field values', () => {
    const response = {
      ...makeSampleResponse('id-1'),
      party_support: 'Labour "party"',
    };
    const csv = buildCSV([response]);
    expect(csv).toContain('"Labour ""party"""');
  });

  it('handles null and undefined fields as empty strings', () => {
    const response = {
      ...makeSampleResponse('id-1'),
      con_leaflet: null,
      con_canvasser: undefined,
    };
    const csv = buildCSV([response]);
    const dataRow = csv.split('\n')[1];
    const fields = dataRow.split(',');
    const conLeafletIndex = EXPECTED_HEADERS.indexOf('con_leaflet');
    const conCanvasserIndex = EXPECTED_HEADERS.indexOf('con_canvasser');
    expect(fields[conLeafletIndex]).toBe('');
    expect(fields[conCanvasserIndex]).toBe('');
  });
});

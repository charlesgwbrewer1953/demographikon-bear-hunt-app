import {
  getResponses,
  saveResponse,
  getCollectorId,
  saveCollectorId,
} from '../utils/storage';

beforeEach(() => {
  localStorage.clear();
});

describe('getResponses', () => {
  it('returns an empty array when nothing is stored', () => {
    expect(getResponses()).toEqual([]);
  });

  it('returns the parsed responses array', () => {
    const responses = [{ response_id: 'abc', party_support: 'Labour' }];
    localStorage.setItem('bear_hunt_responses', JSON.stringify(responses));
    expect(getResponses()).toEqual(responses);
  });

  it('returns an empty array when stored value is invalid JSON', () => {
    localStorage.setItem('bear_hunt_responses', 'not-valid-json');
    expect(getResponses()).toEqual([]);
  });
});

describe('saveResponse', () => {
  it('saves a single response correctly', () => {
    const response = { response_id: 'id-1', party_support: 'Conservative' };
    saveResponse(response);
    expect(getResponses()).toHaveLength(1);
    expect(getResponses()[0]).toEqual(response);
  });

  it('appends responses rather than overwriting', () => {
    const r1 = { response_id: 'id-1', party_support: 'Labour' };
    const r2 = { response_id: 'id-2', party_support: 'Green' };
    saveResponse(r1);
    saveResponse(r2);
    const stored = getResponses();
    expect(stored).toHaveLength(2);
    expect(stored[0]).toEqual(r1);
    expect(stored[1]).toEqual(r2);
  });

  it('does not delete existing responses when adding new ones', () => {
    for (let i = 0; i < 5; i++) {
      saveResponse({ response_id: `id-${i}` });
    }
    expect(getResponses()).toHaveLength(5);
  });
});

describe('getCollectorId', () => {
  it('returns an empty string when not set', () => {
    expect(getCollectorId()).toBe('');
  });
});

describe('saveCollectorId', () => {
  it('saves and retrieves a collector ID', () => {
    saveCollectorId('collector-99');
    expect(getCollectorId()).toBe('collector-99');
  });

  it('overwrites an existing collector ID', () => {
    saveCollectorId('first-id');
    saveCollectorId('second-id');
    expect(getCollectorId()).toBe('second-id');
  });
});

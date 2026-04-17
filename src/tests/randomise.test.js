import { shuffleParties, PARTIES } from '../utils/randomise';

describe('shuffleParties', () => {
  it('returns the correct number of parties', () => {
    const result = shuffleParties(PARTIES);
    expect(result).toHaveLength(5);
  });

  it('contains all original parties with no duplicates', () => {
    const result = shuffleParties(PARTIES);
    const originalKeys = PARTIES.map((p) => p.key).sort();
    const resultKeys = result.map((p) => p.key).sort();
    expect(resultKeys).toEqual(originalKeys);
  });

  it('preserves key and label on each party object', () => {
    const result = shuffleParties(PARTIES);
    result.forEach((p) => {
      expect(p).toHaveProperty('key');
      expect(p).toHaveProperty('label');
      expect(typeof p.key).toBe('string');
      expect(typeof p.label).toBe('string');
    });
  });

  it('does not mutate the original PARTIES array', () => {
    const snapshot = PARTIES.map((p) => ({ ...p }));
    shuffleParties(PARTIES);
    expect(PARTIES).toEqual(snapshot);
  });

  it('produces different orderings across multiple runs', () => {
    const seen = new Set();
    for (let i = 0; i < 30; i++) {
      const order = shuffleParties(PARTIES)
        .map((p) => p.key)
        .join(',');
      seen.add(order);
    }
    expect(seen.size).toBeGreaterThan(1);
  });
});

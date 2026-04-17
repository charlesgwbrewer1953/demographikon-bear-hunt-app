export const PARTIES = [
  { key: 'con', label: 'Conservative' },
  { key: 'lab', label: 'Labour' },
  { key: 'ld', label: 'Liberal Democrat' },
  { key: 'green', label: 'Green' },
  { key: 'reform', label: 'Reform UK' },
];

export function shuffleParties(parties) {
  const arr = [...parties];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

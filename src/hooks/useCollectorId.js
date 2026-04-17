import { useState } from 'react';
import { getCollectorId, saveCollectorId } from '../utils/storage';

export function useCollectorId() {
  const [collectorId, setCollectorId] = useState(() => getCollectorId());

  function updateCollectorId(id) {
    saveCollectorId(id);
    setCollectorId(id);
  }

  return { collectorId, updateCollectorId };
}

import { useState } from 'react';
import { getLocation, saveLocation } from '../utils/storage';

export function useLocation() {
  const [location, setLocation] = useState(() => getLocation());

  function updateLocation(loc) {
    saveLocation(loc);
    setLocation(loc);
  }

  return { location, updateLocation };
}

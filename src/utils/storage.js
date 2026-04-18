const RESPONSES_KEY = 'bear_hunt_responses';
const COLLECTOR_KEY = 'bear_hunt_collector_id';
const LOCATION_KEY = 'bear_hunt_location';

export function getResponses() {
  try {
    const raw = localStorage.getItem(RESPONSES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveResponse(response) {
  const responses = getResponses();
  responses.push(response);
  localStorage.setItem(RESPONSES_KEY, JSON.stringify(responses));
}

export function getCollectorId() {
  return localStorage.getItem(COLLECTOR_KEY) || '';
}

export function saveCollectorId(id) {
  localStorage.setItem(COLLECTOR_KEY, id);
}

export function getLocation() {
  return localStorage.getItem(LOCATION_KEY) || '';
}

export function saveLocation(loc) {
  localStorage.setItem(LOCATION_KEY, loc);
}

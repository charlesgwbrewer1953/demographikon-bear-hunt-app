const RESPONSES_KEY = 'bear_hunt_responses';
const COLLECTOR_KEY = 'bear_hunt_collector_id';

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

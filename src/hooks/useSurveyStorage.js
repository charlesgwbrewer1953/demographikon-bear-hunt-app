import { useState } from 'react';
import { getResponses, saveResponse } from '../utils/storage';

export function useSurveyStorage() {
  const [responses, setResponses] = useState(() => getResponses());

  function addResponse(response) {
    saveResponse(response);
    setResponses((prev) => [...prev, response]);
  }

  return { responses, addResponse };
}

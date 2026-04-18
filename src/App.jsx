import { useState, useRef, useEffect } from 'react';
import { generateUUID } from './utils/uuid';
import { shuffleParties, PARTIES } from './utils/randomise';
import { saveResponse } from './utils/storage';
import { useCollectorId } from './hooks/useCollectorId';
import { useLocation } from './hooks/useLocation';
import CollectorIdScreen from './components/CollectorIdScreen';
import QuestionScreen from './components/QuestionScreen';
import PartyContactScreen from './components/PartyContactScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import ExportScreen from './components/ExportScreen';

const PARTY_SUPPORT_OPTIONS = [
  'Conservative',
  'Labour',
  'Liberal Democrat',
  'Green',
  'Reform UK',
  'Other',
  'None',
  'Prefer not to say',
];

const TURNOUT_OPTIONS = ['I will vote', 'I may vote', "I won't vote"];

const NAMED_PARTIES = new Set([
  'Conservative',
  'Labour',
  'Liberal Democrat',
  'Green',
  'Reform UK',
]);

// 2 fixed questions + 5 party screens (one per party, leaflet + canvasser combined)
const TOTAL_STEPS = 7;

function buildInitialSurveyState() {
  return {
    step: 0,
    partyOrder: shuffleParties(PARTIES),
    answers: {
      party_support: null,
      turnout_intention: null,
      con_leaflet: null,
      con_canvasser: null,
      lab_leaflet: null,
      lab_canvasser: null,
      ld_leaflet: null,
      ld_canvasser: null,
      green_leaflet: null,
      green_canvasser: null,
      reform_leaflet: null,
      reform_canvasser: null,
    },
  };
}

export default function App() {
  const { collectorId, updateCollectorId } = useCollectorId();
  const { location, updateLocation } = useLocation();
  const [screen, setScreen] = useState(() =>
    collectorId && location ? 'survey' : 'collector'
  );
  const [survey, setSurvey] = useState(buildInitialSurveyState);
  const processingRef = useRef(false);

  useEffect(() => {
    processingRef.current = false;
  }, [survey.step]);

  function handleCollectorSubmit(id, loc) {
    updateCollectorId(id);
    updateLocation(loc);
    setSurvey(buildInitialSurveyState());
    setScreen('survey');
  }

  // Handles steps 0 and 1 (party support, turnout intention)
  function handleAnswer(value) {
    if (processingRef.current) return;
    processingRef.current = true;

    const { step, partyOrder, answers } = survey;
    const newAnswers = { ...answers };

    if (step === 0) {
      newAnswers.party_support = value;
    } else {
      newAnswers.turnout_intention = value;
    }

    setSurvey({ step: step + 1, partyOrder, answers: newAnswers });
  }

  // Handles steps 2–6 (one screen per party, both leaflet and canvasser)
  function handlePartyAnswer(leafletValue, canvasserValue) {
    if (processingRef.current) return;
    processingRef.current = true;

    const { step, partyOrder, answers } = survey;
    const party = partyOrder[step - 2];
    const newAnswers = {
      ...answers,
      [`${party.key}_leaflet`]: leafletValue,
      [`${party.key}_canvasser`]: canvasserValue,
    };

    const nextStep = step + 1;

    if (nextStep >= TOTAL_STEPS) {
      const record = {
        response_id: generateUUID(),
        timestamp: new Date().toISOString(),
        collector_id: collectorId,
        location,
        ...newAnswers,
        randomized_party_order: partyOrder.map((p) => p.key),
      };
      saveResponse(record);
      setScreen('confirmation');
    } else {
      setSurvey({ step: nextStep, partyOrder, answers: newAnswers });
    }
  }

  function handleStartNextSurvey() {
    setSurvey(buildInitialSurveyState());
    setScreen('survey');
  }

  if (screen === 'collector') {
    return (
      <CollectorIdScreen
        currentId={collectorId}
        currentLocation={location}
        onSubmit={handleCollectorSubmit}
        onGoToExport={() => setScreen('export')}
      />
    );
  }

  if (screen === 'survey') {
    const { step, partyOrder, answers } = survey;

    if (step < 2) {
      const question =
        step === 0
          ? 'Which party do you support?'
          : 'How likely are you to vote at the next election?';
      const options = step === 0 ? PARTY_SUPPORT_OPTIONS : TURNOUT_OPTIONS;
      return (
        <QuestionScreen
          question={question}
          options={options}
          currentStep={step + 1}
          totalSteps={TOTAL_STEPS}
          collectorId={collectorId}
          onAnswer={handleAnswer}
          onChangeCollectorId={() => setScreen('collector')}
          onGoToExport={() => setScreen('export')}
        />
      );
    }

    const party = partyOrder[step - 2];
    const questionTail = NAMED_PARTIES.has(answers.party_support)
      ? `likelihood to vote for ${answers.party_support}`
      : `likelihood of voting`;

    return (
      <PartyContactScreen
        party={party}
        questionTail={questionTail}
        currentStep={step + 1}
        totalSteps={TOTAL_STEPS}
        collectorId={collectorId}
        onAnswer={handlePartyAnswer}
        onChangeCollectorId={() => setScreen('collector')}
        onGoToExport={() => setScreen('export')}
      />
    );
  }

  if (screen === 'confirmation') {
    return (
      <ConfirmationScreen
        onNext={handleStartNextSurvey}
        onGoToExport={() => setScreen('export')}
      />
    );
  }

  if (screen === 'export') {
    return (
      <ExportScreen
        collectorId={collectorId}
        location={location}
        onBack={() => setScreen(collectorId && location ? 'survey' : 'collector')}
      />
    );
  }

  return null;
}

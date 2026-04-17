import { useState, useRef, useEffect } from 'react';
import { generateUUID } from './utils/uuid';
import { shuffleParties, PARTIES } from './utils/randomise';
import { saveResponse } from './utils/storage';
import { useCollectorId } from './hooks/useCollectorId';
import CollectorIdScreen from './components/CollectorIdScreen';
import QuestionScreen from './components/QuestionScreen';
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

const CONTACT_EFFECT_OPTIONS = [
  'No effect',
  'Bit more likely to vote',
  'Much more likely to vote',
];

const TOTAL_STEPS = 12;

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
  const [screen, setScreen] = useState(() =>
    collectorId ? 'survey' : 'collector'
  );
  const [survey, setSurvey] = useState(buildInitialSurveyState);
  const processingRef = useRef(false);

  useEffect(() => {
    processingRef.current = false;
  }, [survey.step]);

  function handleCollectorSubmit(id) {
    updateCollectorId(id);
    setSurvey(buildInitialSurveyState());
    setScreen('survey');
  }

  function handleAnswer(value) {
    if (processingRef.current) return;
    processingRef.current = true;

    const { step, partyOrder, answers } = survey;
    const newAnswers = { ...answers };

    if (step === 0) {
      newAnswers.party_support = value;
    } else if (step === 1) {
      newAnswers.turnout_intention = value;
    } else {
      const contactStep = step - 2;
      const partyIndex = Math.floor(contactStep / 2);
      const questionType = contactStep % 2 === 0 ? 'leaflet' : 'canvasser';
      const fieldKey = `${partyOrder[partyIndex].key}_${questionType}`;
      newAnswers[fieldKey] = value;
    }

    const nextStep = step + 1;

    if (nextStep >= TOTAL_STEPS) {
      const record = {
        response_id: generateUUID(),
        timestamp: new Date().toISOString(),
        collector_id: collectorId,
        ...newAnswers,
        randomized_party_order: partyOrder.map((p) => p.key),
      };
      saveResponse(record);
      setScreen('confirmation');
    } else {
      setSurvey({ step: nextStep, partyOrder, answers: newAnswers });
    }
  }

  function getCurrentQuestion() {
    const { step, partyOrder } = survey;

    if (step === 0) {
      return {
        question: 'Which party do you support?',
        options: PARTY_SUPPORT_OPTIONS,
      };
    }

    if (step === 1) {
      return {
        question: 'How likely are you to vote at the next election?',
        options: TURNOUT_OPTIONS,
      };
    }

    const contactStep = step - 2;
    const partyIndex = Math.floor(contactStep / 2);
    const questionType = contactStep % 2 === 0 ? 'leaflet' : 'canvasser';
    const party = partyOrder[partyIndex];

    const question =
      questionType === 'leaflet'
        ? `If you received a leaflet from ${party.label}, what effect would it have on your likelihood to vote for them?`
        : `If a ${party.label} canvasser knocked on your door, what effect would it have on your likelihood to vote for them?`;

    return { question, options: CONTACT_EFFECT_OPTIONS };
  }

  function handleStartNextSurvey() {
    setSurvey(buildInitialSurveyState());
    setScreen('survey');
  }

  if (screen === 'collector') {
    return (
      <CollectorIdScreen
        currentId={collectorId}
        onSubmit={handleCollectorSubmit}
        onGoToExport={() => setScreen('export')}
      />
    );
  }

  if (screen === 'survey') {
    const { question, options } = getCurrentQuestion();
    return (
      <QuestionScreen
        question={question}
        options={options}
        currentStep={survey.step + 1}
        totalSteps={TOTAL_STEPS}
        collectorId={collectorId}
        onAnswer={handleAnswer}
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
        onBack={() => setScreen(collectorId ? 'survey' : 'collector')}
      />
    );
  }

  return null;
}

import { useState } from 'react';

const CONTACT_EFFECT_OPTIONS = [
  'No effect',
  'Bit more likely to vote',
  'Much more likely to vote',
];

export default function PartyContactScreen({
  party,
  questionTail,
  currentStep,
  totalSteps,
  collectorId,
  onAnswer,
  onChangeCollectorId,
  onGoToExport,
}) {
  const [leaflet, setLeaflet] = useState(null);
  const [canvasser, setCanvasser] = useState(null);

  const progressPct = Math.round((currentStep / totalSteps) * 100);
  const canProceed = leaflet !== null && canvasser !== null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.collectorLabel}>ID: {collectorId}</span>
        <div style={styles.headerButtons}>
          <button onClick={onChangeCollectorId} style={styles.smallButton}>
            Change ID
          </button>
          <button onClick={onGoToExport} style={styles.smallButton}>
            Export
          </button>
        </div>
      </div>

      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${progressPct}%` }} />
      </div>
      <p style={styles.progressLabel}>
        {currentStep} of {totalSteps}
      </p>

      <h2 style={styles.partyTitle}>{party.label}</h2>

      <div style={styles.section}>
        <p style={styles.sectionQuestion}>
          Leaflet: If you received a leaflet from {party.label}, what effect
          would it have on your {questionTail}?
        </p>
        <div style={styles.optionList}>
          {CONTACT_EFFECT_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => setLeaflet(option)}
              style={{
                ...styles.optionButton,
                ...(leaflet === option ? styles.optionButtonSelected : {}),
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <p style={styles.sectionQuestion}>
          Canvasser: If a {party.label} canvasser knocked on your door, what
          effect would it have on your {questionTail}?
        </p>
        <div style={styles.optionList}>
          {CONTACT_EFFECT_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => setCanvasser(option)}
              style={{
                ...styles.optionButton,
                ...(canvasser === option ? styles.optionButtonSelected : {}),
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => canProceed && onAnswer(leaflet, canvasser)}
        disabled={!canProceed}
        style={{
          ...styles.nextButton,
          opacity: canProceed ? 1 : 0.4,
          cursor: canProceed ? 'pointer' : 'default',
        }}
      >
        Next →
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 480,
    margin: '0 auto',
    padding: '16px',
    fontFamily: 'sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  collectorLabel: {
    fontSize: 13,
    color: '#888',
  },
  headerButtons: {
    display: 'flex',
    gap: 8,
  },
  smallButton: {
    fontSize: 12,
    padding: '5px 10px',
    background: 'none',
    border: '1px solid #ccc',
    borderRadius: 4,
    cursor: 'pointer',
    color: '#555',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1a1a2e',
    borderRadius: 3,
    transition: 'width 0.3s ease',
  },
  progressLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    margin: '0 0 16px 0',
  },
  partyTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: '#1a1a2e',
    margin: '0 0 20px 0',
  },
  section: {
    marginBottom: 24,
  },
  sectionQuestion: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1a1a2e',
    lineHeight: 1.4,
    margin: '0 0 12px 0',
  },
  optionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  optionButton: {
    padding: '14px 16px',
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#1a1a2e',
    border: '2px solid #ccc',
    borderRadius: 8,
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
  },
  optionButtonSelected: {
    backgroundColor: '#1a1a2e',
    color: '#fff',
    border: '2px solid #1a1a2e',
  },
  nextButton: {
    width: '100%',
    padding: '18px',
    fontSize: 18,
    backgroundColor: '#1a1a2e',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 24,
  },
};

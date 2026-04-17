export default function QuestionScreen({
  question,
  options,
  currentStep,
  totalSteps,
  collectorId,
  onAnswer,
  onChangeCollectorId,
  onGoToExport,
}) {
  const progressPct = Math.round((currentStep / totalSteps) * 100);

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
        <div
          style={{
            ...styles.progressFill,
            width: `${progressPct}%`,
          }}
        />
      </div>
      <p style={styles.progressLabel}>
        {currentStep} of {totalSteps}
      </p>

      <h2 style={styles.question}>{question}</h2>

      <div style={styles.optionList}>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            style={styles.optionButton}
          >
            {option}
          </button>
        ))}
      </div>
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
    margin: '0 0 28px 0',
  },
  question: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 28,
    lineHeight: 1.4,
    color: '#1a1a2e',
  },
  optionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  optionButton: {
    padding: '18px 16px',
    fontSize: 17,
    backgroundColor: '#fff',
    color: '#1a1a2e',
    border: '2px solid #1a1a2e',
    borderRadius: 8,
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
  },
};

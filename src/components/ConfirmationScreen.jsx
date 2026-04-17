export default function ConfirmationScreen({ onNext, onGoToExport }) {
  return (
    <div style={styles.container}>
      <div style={styles.icon}>✓</div>
      <h2 style={styles.title}>Survey Saved</h2>
      <p style={styles.message}>Response recorded successfully.</p>
      <div style={styles.buttons}>
        <button onClick={onNext} style={styles.primaryButton}>
          Start Next Survey
        </button>
        <button onClick={onGoToExport} style={styles.secondaryButton}>
          View Export
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 480,
    margin: '0 auto',
    padding: '56px 16px',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  icon: {
    fontSize: 72,
    color: '#2d8a4e',
    lineHeight: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 12,
    color: '#1a1a2e',
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginBottom: 48,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  primaryButton: {
    padding: '18px',
    fontSize: 18,
    backgroundColor: '#1a1a2e',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    width: '100%',
  },
  secondaryButton: {
    padding: '18px',
    fontSize: 18,
    backgroundColor: '#fff',
    color: '#1a1a2e',
    border: '2px solid #1a1a2e',
    borderRadius: 8,
    cursor: 'pointer',
    width: '100%',
  },
};

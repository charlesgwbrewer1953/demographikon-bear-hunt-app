import { useSurveyStorage } from '../hooks/useSurveyStorage';
import { downloadCSV } from '../utils/csvExport';

export default function ExportScreen({ collectorId, location, onBack }) {
  const { responses } = useSurveyStorage();

  function handleDownload() {
    downloadCSV(responses, collectorId, location);
  }

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backButton}>
        ← Back
      </button>
      <h1 style={styles.title}>Export Responses</h1>
      <div style={styles.card}>
        <p style={styles.count}>{responses.length}</p>
        <p style={styles.countLabel}>
          {responses.length === 1 ? 'response' : 'responses'} stored
        </p>
      </div>
      <button
        onClick={handleDownload}
        disabled={responses.length === 0}
        style={{
          ...styles.downloadButton,
          opacity: responses.length === 0 ? 0.4 : 1,
          cursor: responses.length === 0 ? 'default' : 'pointer',
        }}
      >
        Download CSV
      </button>
      {responses.length === 0 && (
        <p style={styles.emptyNote}>No responses to export yet.</p>
      )}
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
  backButton: {
    background: 'none',
    border: 'none',
    fontSize: 16,
    cursor: 'pointer',
    color: '#555',
    padding: '8px 0',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 32,
    color: '#1a1a2e',
  },
  card: {
    background: '#f0f0f0',
    borderRadius: 12,
    padding: '36px',
    textAlign: 'center',
    marginBottom: 32,
  },
  count: {
    fontSize: 64,
    fontWeight: 700,
    color: '#1a1a2e',
    margin: 0,
  },
  countLabel: {
    fontSize: 18,
    color: '#666',
    margin: '8px 0 0 0',
  },
  downloadButton: {
    width: '100%',
    padding: '18px',
    fontSize: 18,
    backgroundColor: '#1a1a2e',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
  },
  emptyNote: {
    textAlign: 'center',
    color: '#999',
    marginTop: 16,
    fontSize: 14,
  },
};

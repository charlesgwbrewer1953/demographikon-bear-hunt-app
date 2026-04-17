import { useState } from 'react';

export default function CollectorIdScreen({ currentId, onSubmit, onGoToExport }) {
  const [value, setValue] = useState(currentId || '');

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>demographiKon Bear Hunt</h1>
      <h2 style={styles.subtitle}>Enter Collector ID</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Your collector ID"
          style={styles.input}
          autoFocus
        />
        <button
          type="submit"
          disabled={!value.trim()}
          style={{
            ...styles.button,
            opacity: value.trim() ? 1 : 0.5,
          }}
        >
          Start Survey
        </button>
      </form>
      <button onClick={onGoToExport} style={styles.linkButton}>
        View Export
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 480,
    margin: '0 auto',
    padding: '40px 16px',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 8,
    color: '#1a1a2e',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 400,
    marginBottom: 32,
    color: '#555',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  input: {
    padding: '14px 16px',
    fontSize: 18,
    border: '2px solid #ccc',
    borderRadius: 8,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '18px',
    fontSize: 18,
    backgroundColor: '#1a1a2e',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    width: '100%',
  },
  linkButton: {
    marginTop: 24,
    background: 'none',
    border: 'none',
    color: '#666',
    fontSize: 14,
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

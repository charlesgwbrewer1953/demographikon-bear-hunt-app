import { useState } from 'react';

export default function CollectorIdScreen({
  currentId,
  currentLocation,
  onSubmit,
  onGoToExport,
}) {
  const [idValue, setIdValue] = useState(currentId || '');
  const [locationValue, setLocationValue] = useState(currentLocation || '');
  const [errors, setErrors] = useState({ collectorId: '', location: '' });

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {
      collectorId: idValue.trim() ? '' : 'Collector ID is required',
      location: locationValue.trim() ? '' : 'Location is required',
    };
    setErrors(newErrors);
    if (newErrors.collectorId || newErrors.location) return;
    onSubmit(idValue.trim(), locationValue.trim());
  }

  return (
    <div style={styles.container}>
      <p style={styles.brandHeader}>demographiKon</p>
      <h1 style={styles.title}>Bear Hunt Survey</h1>
      <h2 style={styles.subtitle}>Collector Details</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Collector ID</label>
          <input
            type="text"
            value={idValue}
            onChange={(e) => {
              setIdValue(e.target.value);
              if (errors.collectorId)
                setErrors((prev) => ({ ...prev, collectorId: '' }));
            }}
            placeholder="Your collector ID"
            style={{
              ...styles.input,
              borderColor: errors.collectorId ? '#c0392b' : '#ccc',
            }}
            autoFocus
          />
          {errors.collectorId && (
            <p style={styles.errorText}>{errors.collectorId}</p>
          )}
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Location</label>
          <input
            type="text"
            value={locationValue}
            onChange={(e) => {
              setLocationValue(e.target.value);
              if (errors.location)
                setErrors((prev) => ({ ...prev, location: '' }));
            }}
            placeholder="e.g. Manchester North"
            style={{
              ...styles.input,
              borderColor: errors.location ? '#c0392b' : '#ccc',
            }}
          />
          {errors.location && (
            <p style={styles.errorText}>{errors.location}</p>
          )}
        </div>

        <button type="submit" style={styles.button}>
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
  brandHeader: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 300,
    fontSize: 20,
    color: '#1a1a2e',
    margin: '0 0 16px 0',
    letterSpacing: '0.02em',
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 4,
    color: '#1a1a2e',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 400,
    marginBottom: 32,
    color: '#555',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    color: '#333',
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
  errorText: {
    margin: 0,
    fontSize: 13,
    color: '#c0392b',
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

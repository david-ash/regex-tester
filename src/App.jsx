import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [matchCount, setMatchCount] = useState(0);
  const [highlightedHTML, setHighlightedHTML] = useState('');
  const [savedRegexes, setSavedRegexes] = useState([]);

  // Example presets
  const examples = [
    {
      label: 'Email Finder',
      pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
      flags: 'g',
      text: 'Contact us at support@example.com or sales@company.co.uk for help.',
    },
    {
      label: 'Phone Number (US)',
      pattern: '\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}',
      flags: 'g',
      text: 'My numbers: (123) 456-7890, 123-456-7890, 123.456.7890',
    },
    {
      label: '4-letter Words',
      pattern: '\\b\\w{4}\\b',
      flags: 'g',
      text: 'This tool will find words like test, code, and cool.',
    },
    {
      label: 'HTML Tags',
      pattern: '<[^>]+>',
      flags: 'g',
      text: '<div>Hello</div><p>This is <strong>HTML</strong></p>',
    },
    {
      label: 'Dates (dd/mm/yyyy)',
      pattern: '\\b\\d{2}/\\d{2}/\\d{4}\\b',
      flags: 'g',
      text: 'Today is 24/05/2025, tomorrow is 25/05/2025.',
    }
  ];
  // Load saved regexes on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('myRegexes')) || [];
    setSavedRegexes(saved);
  }, []);

  // Update highlighted output, match count, error on pattern/flags/text change
  useEffect(() => {
    if (!pattern) {
      setHighlightedHTML(text);
      setMatchCount(0);
      setError('');
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const matches = text.match(regex);
      setMatchCount(matches ? matches.length : 0);
      const highlighted = text.replace(regex, (match) => `<mark>${match}</mark>`);
      setHighlightedHTML(highlighted);
      setError('');
    } catch (e) {
      setError(e.message);
      setMatchCount(0);
      setHighlightedHTML(text);
    }
  }, [pattern, flags, text]);

  // Save current regex to localStorage
  const handleSave = () => {
    const name = prompt('Enter a name for this regex:');
    if (!name) return;
    const entry = { name, pattern, flags };
    const updated = [...savedRegexes, entry];
    localStorage.setItem('myRegexes', JSON.stringify(updated));
    setSavedRegexes(updated);
  };

  // Copy raw text to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Output copied!'))
      .catch(() => alert('Failed to copy.'));
  };

  return (
    <div className="container">
      <h1>Regex Tester</h1>

      {/* Example Presets Dropdown */}
      <select
        onChange={(e) => {
          const selected = examples.find((ex) => ex.label === e.target.value);
          if (selected) {
            setPattern(selected.pattern);
            setFlags(selected.flags);
            setText(selected.text);
            setError('');
          }
        }}
        defaultValue=""
      >
        <option value="" disabled>Select a preset example...</option>
        {examples.map((ex, i) => (
          <option key={i} value={ex.label}>{ex.label}</option>
        ))}
      </select>

      {/* Saved Regexes Dropdown */}
      <select
        onChange={(e) => {
          const selected = savedRegexes.find((ex) => ex.name === e.target.value);
          if (selected) {
            setPattern(selected.pattern);
            setFlags(selected.flags);
            setError('');
          }
        }}
        defaultValue=""
      >
        <option value="" disabled>Select a saved regex...</option>
        {savedRegexes.map((ex, i) => (
          <option key={i} value={ex.name}>{ex.name}</option>
        ))}
      </select>

      <input
        placeholder="Enter Regex Pattern"
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
      />
      <input
        placeholder="Flags (e.g. g, i, m)"
        value={flags}
        onChange={(e) => setFlags(e.target.value)}
      />
      <textarea
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
      />

      <div className="buttons">
        <button onClick={handleSave}>💾 Save Regex</button>
        <button onClick={handleCopy}>📋 Copy Output</button>
      </div>

      {error && <p className="error">{error}</p>}
      {!error && <p>🔍 Matches found: <strong>{matchCount}</strong></p>}

      <div className="results">
        <h3>Highlighted Output:</h3>
        <pre dangerouslySetInnerHTML={{ __html: highlightedHTML }} />
      </div>
    </div>
  );
}

export default App;

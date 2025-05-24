import { useState } from 'react';
import './App.css';

function App() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

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

  const highlightMatches = (text) => {
    try {
      const regex = new RegExp(pattern, flags);
      return text.replace(regex, (match) => `<mark>${match}</mark>`);
    } catch (e) {
      setError(e.message);
      return text;
    }
  };

  const highlightedHTML = highlightMatches(text);

  return (
    <div className="container">
      <h1>Regex Tester</h1>

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
        <option value="" disabled>Select an example...</option>
        {examples.map((ex, i) => (
          <option key={i} value={ex.label}>{ex.label}</option>
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
        onChange={(e) => {
          setText(e.target.value);
          setError('');
        }}
        rows={8}
      />

      {error && <p className="error">{error}</p>}

      <div className="results">
        <h3>Highlighted Output:</h3>
        <pre dangerouslySetInnerHTML={{ __html: highlightedHTML }} />
      </div>
    </div>
  );
}

export default App;

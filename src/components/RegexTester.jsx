import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function RegexTester() {
  const examples = [
    { label: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
    { label: 'URL', pattern: 'https?://[^\\s/$.?#].[^\\s]*' },
    { label: 'US Phone', pattern: '\\(\\d{3}\\) \\d{3}-\\d{4}' },
    { label: 'Date YYYY-MM-DD', pattern: '\\d{4}-\\d{2}-\\d{2}' },
  ];

  const [pattern, setPattern] = useState('');
  const [text, setText] = useState('');
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const [customRegexes, setCustomRegexes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('customRegexes')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!pattern) {
      setMatches([]);
      setError('');
      return;
    }
    try {
      const regex = new RegExp(pattern, 'g');
      const found = [];
      let match;
      while ((match = regex.exec(text)) !== null) {
        found.push({ index: match.index, length: match[0].length });
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
      }
      setMatches(found);
      setError('');
    } catch (e) {
      setError(e.message);
      setMatches([]);
    }
  }, [pattern, text]);

  function getHighlightedText() {
    if (!matches.length) return text;

    const parts = [];
    let lastIndex = 0;
    matches.forEach(({ index, length }, i) => {
      parts.push(text.substring(lastIndex, index));
      parts.push(
        <mark key={i} style={{ backgroundColor: 'yellow' }}>
          {text.substr(index, length)}
        </mark>
      );
      lastIndex = index + length;
    });
    parts.push(text.substring(lastIndex));
    return parts;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => alert('Text copied!'));
  };

  const saveCustomRegex = () => {
    if (pattern && !customRegexes.includes(pattern)) {
      const newList = [...customRegexes, pattern];
      setCustomRegexes(newList);
      localStorage.setItem('customRegexes', JSON.stringify(newList));
      alert('Saved regex!');
    }
  };

  const removeCustomRegex = (p) => {
    const newList = customRegexes.filter(r => r !== p);
    setCustomRegexes(newList);
    localStorage.setItem('customRegexes', JSON.stringify(newList));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Regex Tester</h1>

      <label>
        Select Example Regex:{' '}
        <select
          onChange={e => setPattern(e.target.value)}
          value={pattern}
          style={{ minWidth: 300 }}
        >
          <option value="">--Select an example--</option>
          {examples.map((ex, i) => (
            <option key={i} value={ex.pattern}>
              {ex.label}
            </option>
          ))}
          {customRegexes.map((r, i) => (
            <option key={`custom-${i}`} value={r}>
              Custom: {r}
            </option>
          ))}
        </select>
      </label>

      <div style={{ marginTop: 10 }}>
        <label>
          Regex Pattern:{' '}
          <input
            type="text"
            value={pattern}
            onChange={e => setPattern(e.target.value)}
            placeholder="Enter regex pattern"
            style={{ width: '100%', fontSize: 16, padding: '6px 8px' }}
          />
        </label>
        <button onClick={saveCustomRegex} disabled={!pattern || customRegexes.includes(pattern)} style={{ marginLeft: 8 }}>
          Save Regex
        </button>
      </div>

      <div style={{ marginTop: 10 }}>
        <label>
          Text to Test:
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={6}
            style={{ width: '100%', fontSize: 16, padding: 8 }}
            placeholder="Enter text to test against your regex"
          />
        </label>
      </div>

      {error && (
        <div style={{ color: 'red', marginTop: 10 }}>
          <b>Regex Error:</b> {error}
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <h2>Matches: {matches.length}</h2>
        <div
          style={{
            whiteSpace: 'pre-wrap',
            backgroundColor: '#f0f0f0',
            padding: 10,
            minHeight: 80,
            fontFamily: 'monospace',
          }}
        >
          {getHighlightedText()}
        </div>
        <button onClick={copyToClipboard} style={{ marginTop: 8 }}>
          Copy Text to Clipboard
        </button>
      </div>

      {customRegexes.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <h3>Saved Custom Regexes</h3>
          <ul>
            {customRegexes.map((r, i) => (
              <li key={i}>
                <code>{r}</code>{' '}
                <button onClick={() => { setPattern(r); }} style={{ marginRight: 6 }}>
                  Use
                </button>
                <button onClick={() => removeCustomRegex(r)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Add Back to Home link here */}
      <div style={{ marginTop: 30 }}>
        <Link
          to="/"
          style={{
            padding: '10px 20px',
            backgroundColor: '#555',
            color: 'white',
            textDecoration: 'none',
            borderRadius: 5,
            display: 'inline-block',
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

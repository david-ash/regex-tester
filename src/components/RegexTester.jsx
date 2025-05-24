import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EXAMPLES = [
  { label: "Match digits", pattern: "\\d+" },
  { label: "Match email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
  { label: "Match words", pattern: "\\b\\w+\\b" },
  { label: "Match whitespace", pattern: "\\s+" },
];

export default function RegexTester() {
  const navigate = useNavigate();

  const [regexInput, setRegexInput] = useState("");
  const [testText, setTestText] = useState("");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [savedRegexes, setSavedRegexes] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedRegexes");
    if (saved) setSavedRegexes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (!regexInput) {
      setMatches([]);
      setError(null);
      return;
    }

    try {
      setError(null);
      const re = new RegExp(regexInput, "g");
      const found = [...testText.matchAll(re)];
      setMatches(found);
    } catch {
      setError("Invalid regex pattern");
      setMatches([]);
    }
  }, [regexInput, testText]);

  const saveCurrentRegex = () => {
    if (!regexInput.trim()) return;
    if (savedRegexes.includes(regexInput)) return;

    const newSaved = [...savedRegexes, regexInput];
    setSavedRegexes(newSaved);
    localStorage.setItem("savedRegexes", JSON.stringify(newSaved));
  };

  const loadSavedRegex = (pattern) => {
    setRegexInput(pattern);
  };

  const copyMatches = () => {
    if (!matches.length) return;
    const textToCopy = matches.map((m) => m[0]).join("\n");
    navigator.clipboard.writeText(textToCopy);
    window.M.toast({ html: "Matches copied to clipboard!", classes: "green" });
  };

  const getHighlightedText = () => {
    if (!regexInput) return testText;

    try {
      const re = new RegExp(regexInput, "g");
      const parts = [];
      let lastIndex = 0;

      for (const match of testText.matchAll(re)) {
        const { index } = match;
        if (index === undefined) break;

        parts.push(testText.slice(lastIndex, index));
        parts.push(
          <span key={index} className="yellow lighten-4">
            {testText.slice(index, index + match[0].length)}
          </span>
        );
        lastIndex = index + match[0].length;
      }
      parts.push(testText.slice(lastIndex));
      return parts;
    } catch {
      return testText;
    }
  };

  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <button className="btn blue lighten-1" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h3 className="center-align" style={{ marginTop: "1rem" }}>
        Regex Tester
      </h3>

      <div className="input-field">
        <select
          className="browser-default"
          value={regexInput}
          onChange={(e) => setRegexInput(e.target.value)}
          aria-label="Select example regex"
        >
          <option value="" disabled>
            Choose example regex
          </option>
          {EXAMPLES.map(({ label, pattern }, i) => (
            <option key={i} value={pattern}>
              {label} — <code>{pattern}</code>
            </option>
          ))}
          {savedRegexes.length > 0 && <option disabled>──────────────</option>}
          {savedRegexes.map((pattern, i) => (
            <option key={`saved-${i}`} value={pattern}>
              Saved: {pattern}
            </option>
          ))}
        </select>
      </div>

      <div className="input-field">
        <input
          id="regexInput"
          type="text"
          className="validate"
          value={regexInput}
          onChange={(e) => setRegexInput(e.target.value)}
          placeholder="Or enter custom regex"
        />
      </div>

      <div className="input-field">
        <textarea
          id="testText"
          className="materialize-textarea"
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          placeholder="Enter text to test"
        ></textarea>
      </div>

      {error && <p className="red-text">{error}</p>}

      <div className="section">
        <h5>
          Matches Found: {matches.length}{" "}
          <button
            className="btn-small waves-effect waves-light"
            onClick={copyMatches}
            disabled={!matches.length}
            style={{ marginLeft: "1rem" }}
            title="Copy matches to clipboard"
          >
            Copy Matches
          </button>

          <button
            className="btn-small waves-effect waves-light"
            onClick={saveCurrentRegex}
            disabled={!regexInput.trim()}
            style={{ marginLeft: "1rem" }}
            title="Save this regex for later"
          >
            Save Regex
          </button>
        </h5>
        <ul className="collection">
          {matches.map((m, i) => (
            <li key={i} className="collection-item">
              {m[0]} at index {m.index}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h5>Highlighted Text:</h5>
        <p style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {getHighlightedText()}
        </p>
      </div>
    </div>
  );
}

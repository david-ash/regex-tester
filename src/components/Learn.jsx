import { Link } from 'react-router-dom';

export default function Learn() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Learn about Regular Expressions (Regex)</h1>

      <p>Regular expressions are patterns used to match character combinations in strings.</p>

      <h2>Basic Syntax</h2>
      <ul>
        <li><b>Literal characters:</b> match themselves. E.g. <code>a</code> matches "a".</li>
        <li><b>Character classes:</b> <code>[abc]</code> matches "a", "b", or "c".</li>
        <li><b>Quantifiers:</b> specify number of matches:
          <ul>
            <li><code>+</code> one or more times</li>
            <li><code>*</code> zero or more times</li>
            <li><code>?</code> zero or one time</li>
            <li><code>{`{n}`}</code> exactly n times</li>
          </ul>
        </li>
        <li><b>Anchors:</b> <code>^</code> start of string, <code>$</code> end of string</li>
      </ul>

      <h2>Example</h2>
      <p>To match an email address:</p>
      <pre>
        {[`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}`]}
      </pre>

      <h2>Flags</h2>
      <ul>
        <li><code>g</code>: global match (find all matches)</li>
        <li><code>i</code>: case-insensitive</li>
        <li><code>m</code>: multiline</li>
      </ul>

      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginTop: 20,
          padding: '10px 20px',
          backgroundColor: '#555',
          color: 'white',
          textDecoration: 'none',
          borderRadius: 5,
        }}
      >
        ← Back to Home
      </Link>
    </div>
  );
}

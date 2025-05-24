import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to Regex Tester</h1>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/tester" style={{ marginRight: 15 }}>
          Regex Tester
        </Link>
        <Link to="/learn">Learn Regex</Link>
      </nav>
      <p>Use this app to test regular expressions and learn regex basics.</p>
    </div>
  );
}

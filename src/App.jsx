import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Learn from './components/Learn';
import RegexTester from './components/RegexTester';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tester" element={<RegexTester />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </Router>
  );
}

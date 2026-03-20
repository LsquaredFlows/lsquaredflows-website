import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage3D from './LandingPage3D';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage3D />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </Router>
  );
}

export default App;

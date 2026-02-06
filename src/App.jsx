// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx'; // Add this import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Login />} /> {/* Login/Sign in page */}
        <Route path="/register" element={<Register />} /> {/* Registration page */}
      </Routes>
    </Router>
  );
}

export default App;

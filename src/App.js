import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import ImportPage from './ImportPage';
import ExportPage from './ExportPage';
import './App.css';
import logoImage from './logo2.jpg';

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="app-title">Steganografija <br/>Tehnika Prikrivenog Komuniciranja</h1>
        <Link to="/" className="home-link">
        <div style={{ width: '100%', height: '100%', margin: '1% auto' }}>
            <img src={logoImage} alt="Logo" width="10%" height="10%" />
          </div>
        </Link>
        <div className="button-container">
          <Link to="/import" className="nav-button btn btn-primary">
            Uvezi poruku
          </Link>
          <Link to="/export" className="nav-button btn btn-primary">
            Izvezi poruku
          </Link>
        </div>
        <Routes>
          <Route path="/import" element={<ImportPage />} />
          <Route path="/export" element={<ExportPage />} />
          <Route path="/*" element={<Navigate to="/choose" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

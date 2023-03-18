import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/Auth';

const AuthedLandingPage = Auth(LandingPage, null);
const AuthedLoginPage = Auth(LoginPage, false);
const AuthedRegisterPage = Auth(RegisterPage, false);

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<AuthedLandingPage />} />
          <Route path="/login" element={<AuthedLoginPage />} />
          <Route path="/register" element={<AuthedRegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

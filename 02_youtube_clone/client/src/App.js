import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/Auth';
import VideoUploadPage from './components/views/VideoUploadPage/VideoUploadPage';
import NavBar from './components/views/NavBar/NavBar';

const AuthedLandingPage = Auth(LandingPage, null);
const AuthedLoginPage = Auth(LoginPage, false);
const AuthedRegisterPage = Auth(RegisterPage, false);
const AuthedVideoUploadPage = Auth(VideoUploadPage, true);

function App() {
  return (
    // 👇 안쪽 태그들이 렌더링 될 때 까지 fallback 안의 요소를 보여준다
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <NavBar />
        <div>
          <Routes>
            <Route exact path="/" element={<AuthedLandingPage />} />
            <Route path="/login" element={<AuthedLoginPage />} />
            <Route path="/register" element={<AuthedRegisterPage />} />
            <Route path="/video/upload" element={<AuthedVideoUploadPage />} />
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;

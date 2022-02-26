import React from 'react';

import { Route, Routes } from 'react-router-dom';
import './App.css';
import GoogleAuth from './login/GoogleAuth';
import SignUp from './login/SignUp';

import NavigationSideBar from './components/Navigation/NavigationSideBar';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GoogleAuth />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<NavigationSideBar />} />
      </Routes>
    </div>
  );
}

export default App;

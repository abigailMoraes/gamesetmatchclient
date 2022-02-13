import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import NavigationSideBar from './components/Navigation/NavigationSideBar';

function App() {
  return (
    <BrowserRouter>
      <NavigationSideBar />
    </BrowserRouter>
  );
}

export default App;

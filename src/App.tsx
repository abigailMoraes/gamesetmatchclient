import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import GoogleAuth from "./login/GoogleAuth";
import SignUp from "./login/SignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GoogleAuth />} />
        <Route path="/signup" element={<SignUp/>}/>
        </Routes>
    </div>
  );
}

export default App;

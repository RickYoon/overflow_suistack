import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopNav from "component/topNav"

import MainPage from "pages/Main"
import PortfolioPage from "pages/Portfolio"
// import 'semantic-ui-css/semantic.min.css'
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<TopNav />} />
            <Route path="/portfolio" element={<TopNav />} />
          </Routes>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

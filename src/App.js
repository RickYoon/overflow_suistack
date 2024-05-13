import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopNav from "component/topNav"

import Invest from "pages/Invest"
import Detail from "pages/Detail"
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<TopNav />} />
            <Route path="/invest" element={<TopNav />} />
            <Route path="/detail/:id" element={<TopNav />} />
          </Routes>
        <Routes>
          <Route exact path="/" element={<Invest />} />
          <Route exact path="/invest" element={<Invest />} />
          <Route exact path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopNav from "component/topNav"

import Invest from "pages/Invest"
import SuiLong from "pages/SuiLong"
import SuiLongStaking from "pages/SuiLongStaking"

import Poollist from "pages/poolsearch"
import DetailStaking from "pages/Detail_Staking"

// import 'semantic-ui-css/semantic.min.css'
import './App.css';


function App() {
  return (
    <>
    
      <Router>
        <Routes>
            <Route path="/" element={<TopNav />} />
            <Route path="/invest" element={<TopNav />} />
            <Route exact path="/yield/long" element={<TopNav />} />
            <Route exact path="/yield/long/staking" element={<TopNav />} />

            <Route path="/search" element={<TopNav />} />
            <Route path="/detail/:id" element={<TopNav />} />
          </Routes>
        <Routes>
          <Route exact path="/" element={<Invest />} />
          <Route exact path="/invest" element={<Invest />} />
          <Route exact path="/yield/long" element={<SuiLong />} />
          <Route exact path="/yield/long/staking" element={<SuiLongStaking />} />


          <Route exact path="/cetus/:id" element={<cetus />} />
          <Route exact path="/search" element={<Poollist />} />
          <Route exact path="/detail/:id" element={<DetailStaking />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

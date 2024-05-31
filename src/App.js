import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopNav from "component/topNav"
import DetailStaking from "pages/Detail_Staking"

// import 'semantic-ui-css/semantic.min.css'
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<TopNav />} />
          </Routes>
        <Routes>
          <Route exact path="/" element={<DetailStaking />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

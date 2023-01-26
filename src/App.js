import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from 'layout/layout';
import Dashboard from "pages/dashboard";
import Staking from "pages/staking";
import Projects from "pages/projects";
import Team from "pages/team";

library.add(fab, faCheckSquare, faCoffee)

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Dashboard />}/>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/staking" element={<Staking />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/team" element={<Team />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;

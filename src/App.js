import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
    faCheckSquare,
    faCoffee,
    faRightToBracket,
    faWallet,
    faBars,
    faCircleXmark,
    faXmark,
    faUser,
    faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "pages/dashboard";
import Staking from "pages/staking";
import Projects from "pages/projects";
import Team from "pages/team";
import { DappProvider } from '@multiversx/sdk-dapp/wrappers/DappProvider';
import {environment} from "utils/variables";

library.add(
    fab,
    faCheckSquare,
    faCoffee,
    faRightToBracket,
    faWallet,
    faBars,
    faCircleXmark,
    faXmark,
    faUser,
    faUserCircle
);

function App() {
  return (
      <DappProvider
          environment={environment}
          customNetworkConfig={{ name: 'customConfig', apiTimeout: 6000 }}
          completedTransactionsDelay={200}
      >
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Dashboard />}/>
                  <Route path="/dashboard" element={<Dashboard />}/>
                  <Route path="/staking" element={<Staking />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/team" element={<Team />} />
              </Routes>
          </BrowserRouter>
      </DappProvider>
  );
}

export default App;

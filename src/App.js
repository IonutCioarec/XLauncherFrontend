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
    faUserCircle,
    faCheck
} from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "pages/dashboard";
import Staking from "pages/staking";
import Projects from "pages/projects";
import Team from "pages/team";
import Admin from "pages/admin";
import Bloodshed_lottery from "pages/presale/bloodshed_lottery";
import Bloodshed from "pages/presale/bloodshed";
import Zero2Infinity from "pages/projects/Zero2Infinity";
import EstarGames from "pages/projects/EstarGames";
import VestaXFinance from "pages/projects/VestaXFinance";
import { DappProvider } from '@multiversx/sdk-dapp/wrappers/DappProvider';
import {NotificationModal, SignTransactionsModals, TransactionsToastList} from "@multiversx/sdk-dapp/UI";
import {networkId} from "config/customConfig";
import {networkConfig} from "config/networks";

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
    faUserCircle,
    faCheck
);

function App() {
    //Set the config network
    const customNetConfig = networkConfig[networkId];

    return (
        <DappProvider
          environment={customNetConfig.id}
          customNetworkConfig={customNetConfig}
          completedTransactionsDelay={200}
        >
          <TransactionsToastList />
          <NotificationModal />
          <SignTransactionsModals />
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Staking />} />
                  {/*<Route path="/dashboard" element={<Dashboard />}/>*/}
                  <Route path="/staking" element={<Staking />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/presale/bloodshed" element={<Bloodshed />} />
                  <Route path="/projects/zero-2-infinity" element={<Zero2Infinity />} />
                  <Route path="/projects/estar-games" element={<EstarGames />} />
                  <Route path="/projects/vestax-finance" element={<VestaXFinance />} />
                  <Route path='*' element={<Navigate to='/' />} />
              </Routes>
          </BrowserRouter>
        </DappProvider>
    );
}

export default App;

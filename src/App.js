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
import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "pages/dashboard";
import Staking from "pages/staking";
import Projects from "pages/projects";
import Team from "pages/team";
import { DappProvider } from '@multiversx/sdk-dapp/wrappers/DappProvider';
import {generalConfig, allTokens} from "config/general";
import {NotificationModal, SignTransactionsModals, TransactionsToastList} from "@multiversx/sdk-dapp/UI";
import {getAccountTokens, getAccountNFTS} from "utils/api";
import {useGetAccountInfo} from "@multiversx/sdk-dapp/hooks/account";
import { useGetPendingTransactions} from '@multiversx/sdk-dapp/hooks/transactions';
import { networkConfig} from "config/networks";

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
    const customNetConfig = networkConfig.mainnet;
    const config = generalConfig.mainnet;
    const tokens = allTokens.mainnet;

    //Get the user address
    const { address } = useGetAccountInfo();
    const isLoggedIn = Boolean(address);

    //Check if there is any loading transactions
    const loadingTransactions = useGetPendingTransactions().hasPendingTransactions;

    //Tokens API
    const tokensAPI = config.apiLink + address + '/tokens?size=2000';
    let defaultTokenList = Object.fromEntries(
        Object.entries(tokens).map(([key, value]) => [key, 0])
    );
    const [tokenList, setTokenList] = useState(defaultTokenList);

    //NFTS API
    const nftsAPI = config.apiLink + address + '/nfts?size=1000&search=XLHO-5135c9';
    const [accountNFTS, setAcountNFTS] = useState({
        rust: 0,
        bronze: 0,
        silver: 0,
        gold: 0,
        platinum: 0,
        legendary: 0
    });

    useEffect(() => {
        if(isLoggedIn) {
            const getData = async () => {
                const newTokenList = await getAccountTokens(tokensAPI, tokens);
                setTokenList(newTokenList);

                const newNftsList = await getAccountNFTS(nftsAPI);
                setAcountNFTS(newNftsList);
            }
            getData();
        }
        // eslint-disable-next-line
    }, [loadingTransactions])

    useEffect(() => {
        // eslint-disable-next-line
        if(isLoggedIn) {
            const getData = async () => {
                const tokenList = await getAccountTokens(tokensAPI, tokens);
                setTokenList(tokenList);

                const nftsList = await getAccountNFTS(nftsAPI);
                setAcountNFTS(nftsList);
            }

            const intervalId = setInterval(getData, 6000);
            return () => clearInterval(intervalId);
        }
        // eslint-disable-next-line
    }, [])

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
                  <Route path="/" element={<Dashboard tokenList={tokenList} accountNFTS={accountNFTS}/>} />
                  <Route path="/dashboard" element={<Dashboard tokenList={tokenList} accountNFTS={accountNFTS}/>}/>
                  <Route path="/staking" element={<Staking tokenList={tokenList} accountNFTS={accountNFTS} />} />
                  <Route path="/projects" element={<Projects tokenList={tokenList} accountNFTS={accountNFTS} />} />
                  <Route path="/team" element={<Team tokenList={tokenList} accountNFTS={accountNFTS} />} />
                  <Route path='*' element={<Navigate to='/' />} />
              </Routes>
          </BrowserRouter>
      </DappProvider>
  );
}

export default App;

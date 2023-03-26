import React, {useEffect, useState} from "react";
import Layout from 'layout/layout';
import "assets/css/globals.css";
import "assets/css/bloodshed.css";
import Image from "react-bootstrap/Image";
import char1 from "assets/images/char1.png";
import char2 from "assets/images/char2.png";
import Container from "@mui/material/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {contractQuery, getAccountTokens} from "utils/api";
import {buyTickets} from "utils/bloodshedLotteryApi.js";
import {customConfig, networkId, allTokens} from "config/customConfig";
import {networkConfig} from "config/networks";
import lotteryAbi from "abiFiles/launchpad.abi.json";
import {ProxyNetworkProvider} from "@multiversx/sdk-network-providers/out";
import {getIsLoggedIn, refreshAccount} from "@multiversx/sdk-dapp/utils";
import {useGetAccountInfo} from "@multiversx/sdk-dapp/hooks";
import {Address, AddressValue} from "@multiversx/sdk-core/out";
import BloodshedTicketsSaleCard from "cards/BloodshedTicketsSaleCard";
import DateCountdown from "components/dateCountdown";
import {multiplier} from "utils/utilities";
import {Card} from "react-bootstrap";
import logoTitle from "assets/images/zalmoxis_logo.png";

function Bloodshed() {
    //Set the config network
    const config = customConfig[networkId];
    const tokens = allTokens[networkId];
    const {address} = useGetAccountInfo();

    const networkProvider = new ProxyNetworkProvider(config.provider);
    const scAddress = config.bloodshedAddress;
    const scToken = config.bloodshedToken;
    const scName = "Launchpad";
    const chainID = networkConfig[networkId].shortId;
    const tokensAPI = config.apiLink + address + '/tokens?size=2000';

    //Sc query
    const [configuration, setConfiguration] = useState(null);
    const [totalNumberOfSoldTickets, setTotalNumberOfSoldTickets] = useState(null);
    const [totalNumberOfTicketsForAddress, setTotalNumberOfTicketsForAddress] = useState(0);
    const getContractData = async () => {
        const newConfiguration = await contractQuery(
            networkProvider,
            lotteryAbi,
            scAddress,
            scName,
            "getConfiguration",
            []
        );
        setConfiguration(newConfiguration);

        const newTotalNumberOfSoldTickets = await contractQuery(
            networkProvider,
            lotteryAbi,
            scAddress,
            scName,
            "getTotalNumberOfTickets",
            []
        );
        setTotalNumberOfSoldTickets(newTotalNumberOfSoldTickets);

        if(getIsLoggedIn()){
            const newTotalNumberOfTicketsForAddress = await contractQuery(
                networkProvider,
                lotteryAbi,
                scAddress,
                scName,
                "getTotalNumberOfTicketsForAddress",
                [new AddressValue(new Address(address))]
            );
            setTotalNumberOfTicketsForAddress(newTotalNumberOfTicketsForAddress);
        }
    };

    //Get Account Tokens Balance
    const [vegldBalance, setVegldBalance] = useState(0);
    const getWalletData = async () => {
        try {
            const response = await fetch(tokensAPI, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            const json = await response.json();
            if(json) {
                json.forEach(item => {
                    if (item.identifier === scToken) {
                        setVegldBalance(item.balance / multiplier);
                    }
                })
            }
        }catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getWalletData();
        const interval = window.setInterval(() => {
            if(getIsLoggedIn()){
                getWalletData();
            }
        }, 5000);
        return () => window.clearInterval(interval);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getContractData();
        const interval = window.setInterval(() => {
            getContractData();
        }, 2000);
        return () => window.clearInterval(interval);
        // eslint-disable-next-line
    }, []);

    let disabledVar = false;
    let currentTimestamp = new Date(Math.floor((new Date()).getTime() /1000));

    //get lottery phase
    let phase = null;
    if(configuration){
        if (currentTimestamp < configuration.ticket_purchase_start_timestamp){
            phase = 'not_started';
        }else if (currentTimestamp >= configuration.ticket_purchase_start_timestamp && currentTimestamp < configuration.winner_selection_start_timestamp){
            phase = 'tickets_purchase';
        }else if (currentTimestamp >= configuration.winner_selection_start_timestamp && currentTimestamp < configuration.claim_start_timestamp){
            phase = 'winner_selection';
        }else if (currentTimestamp >= configuration.claim_start_timestamp){
            phase = 'claim_results';
        }
    }

    let topInfo = '';
    let timestamp;
    //countdown initialization
    if(phase){
        switch (phase) {
            case 'not_started':
                disabledVar = true;
                timestamp = parseInt(configuration.ticket_purchase_start_timestamp);
                topInfo = (
                    <div className="show-counter">
                        <p className="h1 text-white"> Buying Tickets Phase Starts in </p>
                        <a className="countdown-link">
                            <DateCountdown dateTo={timestamp * 1000}/>
                        </a>
                    </div>
                );
                break;
            case 'tickets_purchase':
                disabledVar = false;
                topInfo =(
                    <div className="show-counter">
                        <p className="h1 text-white"> Buying Tickets Phase is Open</p>
                    </div>
                );
                break;
            case 'winner_selection':
                disabledVar = true;
                timestamp = parseInt(configuration.claim_start_timestamp);
                topInfo = (
                    <div className="show-counter">
                        <p className="h1 text-white"> Winner Selection Phase in Progress  </p>
                        <a className="countdown-link">
                            <DateCountdown dateTo={timestamp * 1000}/>
                        </a>
                    </div>
                );
                break;
            case 'claim_results':
                disabledVar = true;
                topInfo = (
                    <div className="show-counter">
                        <p className="h1 text-white"> Claim Rewards Phase is Open </p>
                    </div>
                );
                break;
        }
    }

    console.log("disabledVar before" + disabledVar);
    if(totalNumberOfTicketsForAddress || !getIsLoggedIn()){
        disabledVar = true;
    }

    console.log("disabledVar after" + disabledVar);


    return (
        <Layout >
            <Container>
                <Row className="text-center mt-5">
                    <Col>
                        {topInfo}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={{offset: 2, span: 8}} md={{offset: 3, span: 6}} lg={{offset: 4, span: 4}} className="text-center">
                        {totalNumberOfSoldTickets ?
                            <p className="h4 text-white">
                                Owned Tickets: {totalNumberOfTicketsForAddress.toString()})
                            </p>
                            : ('')
                        }
                        <BloodshedTicketsSaleCard
                            buyTickets={() => buyTickets(networkProvider, lotteryAbi, scAddress, scName, scToken, chainID, 5)}
                            disabledVar={disabledVar}
                            vegld = {vegldBalance}
                        />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Bloodshed;
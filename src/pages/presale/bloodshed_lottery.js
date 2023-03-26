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

import {contractQuery} from "utils/api";
import {buyTickets, claimResults} from "utils/bloodshedLotteryApi.js";
import {customConfig, networkId} from "config/customConfig";
import {networkConfig} from "config/networks";
import lotteryAbi from "abiFiles/launchpad.abi.json";
import {ProxyNetworkProvider} from "@multiversx/sdk-network-providers/out";
import {getIsLoggedIn, refreshAccount} from "@multiversx/sdk-dapp/utils";
import Button from "react-bootstrap/Button";
import {useGetAccountInfo} from "@multiversx/sdk-dapp/hooks";
import {Address, AddressValue} from "@multiversx/sdk-core/out";

function Bloodshed_lottery() {
    //Set the config network
    const config = customConfig[networkId];
    const {address} = useGetAccountInfo();

    const networkProvider = new ProxyNetworkProvider(config.provider);
    const scAddress = config.bloodshedAddress;
    const scToken = config.bloodshedToken;
    const scName = "Launchpad";
    const chainID = networkConfig[networkId].shortId;

    const [lotteryStage, setLotteryStage] = useState();
    const [configuration, setConfiguration] = useState();
    const [totalNumberOfSoldTickets, setTotalNumberOfSoldTickets] = useState();
    const [ticketRangeForAddress, setTicketRangeForAddress] = useState();
    const [totalNumberOfTicketsForAddress, setTotalNumberOfTicketsForAddress] = useState();
    const [winningTicketIdsForAddress, setWinningTicketIdsForAddress] = useState();
    const [hasUserClaimedTokens, setHasUserClaimedTokens] = useState();
    const [numberOfWinningTicketsForAddress, setNumberOfWinningTicketsForAddress] = useState();

    const getContractData = async () => {
        const newLotteryStage = await contractQuery(
            networkProvider,
            lotteryAbi,
            scAddress,
            scName,
            "getLotteryStage",
            []
        );
        setLotteryStage(newLotteryStage["name"]);

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


        console.log("getLotteryStage " + JSON.stringify(newLotteryStage, null, 2));
        console.log("getConfiguration " + JSON.stringify(newConfiguration, null, 2));
        console.log("getTotalNumberOfTickets " + newTotalNumberOfSoldTickets);
    };

    const getLoggedInContractData = async () => {
        const newTicketRangeForAddress = await contractQuery(
            networkProvider,
            lotteryAbi,
            scAddress,
            scName,
            "getTicketRangeForAddress",
            [new AddressValue(new Address(address))]
        );
        setTicketRangeForAddress(newTicketRangeForAddress);

        const newTotalNumberOfTicketsForAddress = await contractQuery(
            networkProvider,
            lotteryAbi,
            scAddress,
            scName,
            "getTotalNumberOfTicketsForAddress",
            [new AddressValue(new Address(address))]
        );
        setTotalNumberOfTicketsForAddress(newTotalNumberOfTicketsForAddress);

        const newWinningTicketIdsForAddress = await contractQuery(
            networkProvider,
            lotteryAbi,
            scAddress,
            scName,
            "getWinningTicketIdsForAddress",
            [new AddressValue(new Address(address))]
        );
        setWinningTicketIdsForAddress(newWinningTicketIdsForAddress);

        const newHasUserClaimedTokens = await contractQuery(
            networkProvider,
            lotteryAbi,
            scAddress,
            scName,
            "hasUserClaimedTokens",
            [new AddressValue(new Address(address))]
        );
        setHasUserClaimedTokens(newHasUserClaimedTokens);

        const newNumberOfWinningTicketsForAddress = await contractQuery(
            networkProvider,
            lotteryAbi,
            scAddress,
            scName,
            "getNumberOfWinningTicketsForAddress",
            [new AddressValue(new Address(address))]
        );
        setNumberOfWinningTicketsForAddress(newNumberOfWinningTicketsForAddress);

        console.log("getTicketRangeForAddress " + JSON.stringify(newTicketRangeForAddress, null, 2));
        console.log("getTotalNumberOfTicketsForAddress " + newTotalNumberOfTicketsForAddress);
        console.log("getWinningTicketIdsForAddress " + newWinningTicketIdsForAddress);
        console.log("hasUserClaimedTokens " + newHasUserClaimedTokens);
        console.log("getNumberOfWinningTicketsForAddress " + newNumberOfWinningTicketsForAddress);
    };

    useEffect(() => {
        getContractData();
        if(getIsLoggedIn()){
            getLoggedInContractData();
        }
        // eslint-disable-next-line
    }, []);

    const currentTimeStamp = new Date();


    return (
        <Layout >
            <Container>
                <Row className="mt-5">
                    <Col>
                        <Button
                            className = "btn btn-block btn-sm btn-info mt-3"
                            style={{ minWidth: "90px" }}
                            onClick={() =>buyTickets(networkProvider, lotteryAbi, scAddress, scName, scToken, chainID, 5)}
                        >
                            Buy Tickets
                        </Button>
                        <Button
                            className = "btn btn-block btn-sm btn-info mt-3"
                            style={{ minWidth: "90px" }}
                            onClick={() =>buyTickets(networkProvider, lotteryAbi, scAddress, scName, chainID)}
                        >
                            Claim Results
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Bloodshed_lottery;
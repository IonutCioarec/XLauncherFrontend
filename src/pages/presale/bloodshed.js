import React, {useEffect} from "react";
import Layout from 'layout/layout';
import "assets/css/globals.css";
import "assets/css/bloodshed.css";
import Image from "react-bootstrap/Image";
import char1 from "assets/images/char1.png";
import char2 from "assets/images/char2.png";
import Container from "@mui/material/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
    Address,
    AddressValue,
    BigUIntValue,
    BytesValue,
    ContractFunction,
    TransactionPayload
} from "@multiversx/sdk-core/out";
import {contractQuery, contractQuery2, getAccountTokens} from "utils/api";
import {allTokens, customConfig, networkId} from "config/customConfig";
import lotteryAbi from "abiFiles/launchpad.abi.json";
import {ProxyNetworkProvider} from "@multiversx/sdk-network-providers/out";
import {getIsLoggedIn, refreshAccount} from "@multiversx/sdk-dapp/utils";
import {BigNumber} from "bignumber.js";
import {sendTransactions} from "@multiversx/sdk-dapp/services";
import Button from "react-bootstrap/Button";

function Bloodshed() {
    //Set the config network
    const config = customConfig[networkId];
    const tokens = allTokens[networkId];

    const networkProvider = new ProxyNetworkProvider(config.provider);
    const scAddress = "erd1qqqqqqqqqqqqqpgqu49gc3lfzgr3jdh0ehhssmrfhdrmw3ka6ppsr8nxmu";

    const getClientReportData = async () => {
        const newClientReport = await contractQuery(
            networkProvider,
            lotteryAbi,
            scAddress,
            "Launchpad",
            "getNumberOfConfirmedTicketsForAddress",
            [new AddressValue(new Address("erd179xw6t04ug48m74jzyw9zq028hv66jhqayelzpzvgds0ptnzmckq2jf07f"))]
        );
        const newClientReport2 = await contractQuery(
            networkProvider,
            lotteryAbi,
            scAddress,
            "Launchpad",
            "getConfiguration",
            []
        );
        const newClientReport3 = await contractQuery(
            networkProvider,
            lotteryAbi,
            scAddress,
            "Launchpad",
            "getTotalNumberOfTickets",
            []
        );
        const newClientReport4 = await contractQuery(
            networkProvider,
            lotteryAbi,
            scAddress,
            "Launchpad",
            "getLotteryStage",
            []
        );
        console.log("getNumberOfConfirmedTicketsForAddress " + newClientReport);
        console.log("getConfiguration " + JSON.stringify(newClientReport2, null, 2));
        console.log("getTotalNumberOfTickets " + newClientReport3);
        console.log("getLotteryStage " + JSON.stringify(newClientReport4, null, 2));
    };

    const [transactionSessionId, setTransactionSessionId] = React.useState(null);

    useEffect(() => {
            getClientReportData();
        // eslint-disable-next-line
    }, []);

    return (
        <Layout >
            <Container>
                <Row className="mt-5">
                    <Button
                        className = "btn btn-block btn-sm btn-info"
                        style={{ minWidth: "90px" }}
                        onClick={() =>contractQuery2(networkProvider, lotteryAbi, scAddress, "Launchpad", 1)}
                    >
                        Buy Tickets
                    </Button>
                </Row>
            </Container>
        </Layout>
    );
}

export default Bloodshed;
import React, {useState} from "react";
import Layout from 'layout/layout';
import {Address, AddressValue} from "@multiversx/sdk-core/out";
import Button from 'react-bootstrap/Button';
import {contractQuery, getAccountTokens} from "utils/api";
import stakeAbi from "abiFiles/xlauncher-staking.abi.json";
import {useGetAccountInfo} from "@multiversx/sdk-dapp/hooks";
import {ProxyNetworkProvider} from "@multiversx/sdk-network-providers/out";
import {networkId, customConfig} from "config/customConfig";

function Admin() {
    //Set the config network
    const config = customConfig[networkId];
    const networkProvider = new ProxyNetworkProvider(config.provider);
    const stakeScAddress = config.stakeAddress;


    const getClientStateData = async (address) => {
        const newClientState = await contractQuery(
            networkProvider,
            stakeAbi,
            stakeScAddress,
            "XLauncherStaking",
            "getClientState",
            [new AddressValue(new Address(address))]
        );
        console.log("client state data: " + JSON.stringify(newClientState, null, 2));
    };

    return (
        <Layout>
            <p style={{fontSize: '50px', color: 'white'}}>Admin</p>
            <Button onClick={()=> getClientStateData("erd14h0nwmg553xqkly6lcjvty3pteypuup774y7c84jn9x0jkctgs4s59y8he")}> Query Client State Data</Button>
        </Layout>
    );
}

export default Admin;
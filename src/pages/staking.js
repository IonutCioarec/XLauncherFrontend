import React, {useState, useEffect} from "react";
import Layout from 'layout/layout';
import StakingCard from 'cards/StakingCard';
import CompleteUnstakeCard from 'cards/CompleteUnStakeCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {allTokens, customConfig, networkId} from "config/customConfig";
import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks/account";
import { calc2, multiplier, calculateGasLimit } from "utils/utilities";
import { useGetPendingTransactions } from "@multiversx/sdk-dapp/hooks/transactions";
import { ProxyNetworkProvider  } from "@multiversx/sdk-network-providers/out";
import {contractQuery, getAccountTokens} from "utils/api";
import stakeAbi from "abiFiles/xlauncher-staking.abi.json";
import {Address, AddressValue} from "@multiversx/sdk-core/out";
import {claimXLH, reinvestXLH, stakeXLH, unstakeXLH, claimUXLH} from "utils/farmsApi";

function Staking() {
    //Set the config network
    const config = customConfig[networkId];
    const tokens = allTokens[networkId];

    //Get the user address
    const {address, account} = useGetAccountInfo();
    const isLoggedIn = Boolean(address);
    const networkProvider = new ProxyNetworkProvider(config.provider);
    const stakeScAddress = config.stakeAddress;
    const stakeToken = config.token;
    const tokensAPI = config.apiLink + address + '/tokens?size=2000';

    //Check if there is any loading transactions
    const loadingTransactions = useGetPendingTransactions().hasPendingTransactions;

    //Get client report data query
    const [clientReportData, setClientReportData] = useState({
        totalAmount: "",
        totalRewards: "",
        farm1Amount: "",
        farm1Rewards: "",
        farm2Amount: "",
        farm2Rewards: "",
        farm3Amount: "",
        farm3Rewards: ""
    });
    const getClientReportData = async () => {
        const newClientReport = await contractQuery(
            networkProvider,
            stakeAbi,
            stakeScAddress,
            "XLauncherStaking",
            "getClientReport",
            [new AddressValue(new Address(address))]
        );
        let totalAmount = newClientReport["total_amount"].toFixed(2) / multiplier;
        let totalRewards = newClientReport["total_rewords"].toFixed(2) / multiplier;
        let farm1Amount = 0;
        let farm1Rewards = 0;
        let farm2Amount = 0;
        let farm2Rewards = 0;
        let farm3Amount = 0;
        let farm3Rewards = 0;
        if (newClientReport["report_pull_items"]) {
            newClientReport["report_pull_items"].map(item0 => {
                let switcher = parseInt(item0.pool_id);
                switch (switcher) {
                    case 1:
                        farm1Amount = item0.pool_amount.toFixed() / multiplier;
                        farm1Rewards = item0.rewords_amount.toFixed() / multiplier;
                        break;
                    case 2:
                        farm2Amount = item0.pool_amount.toFixed() / multiplier;
                        farm2Rewards = item0.rewords_amount.toFixed() / multiplier;
                        break;
                    case 3:
                        farm3Amount = item0.pool_amount.toFixed() / multiplier;
                        farm3Rewards = item0.rewords_amount.toFixed() / multiplier;
                        break;
                }
            })
        }
        setClientReportData({
            totalAmount,
            totalRewards,
            farm1Amount,
            farm1Rewards,
            farm2Amount,
            farm2Rewards,
            farm3Amount,
            farm3Rewards
        });
    }

    //Get client report data query
    const [clientStateData1, setClientStateData1] = useState([]);
    const [clientStateData2, setClientStateData2] = useState([]);
    const [clientStateData3, setClientStateData3] = useState([]);
    const getClientStateData = async () => {
        const newClientState = await contractQuery(
            networkProvider,
            stakeAbi,
            stakeScAddress,
            "XLauncherStaking",
            "getClientState",
            [new AddressValue(new Address(address))]
        );

        let pool1 = [];
        let pool2 = [];
        let pool3 = [];
        if(newClientState){
            Object.values(newClientState).map(element => {
                let elementSwitcher = parseInt(element.pool_id);
                switch (elementSwitcher) {
                    case 1:
                        pool1.push(element);
                        break;
                    case 2:
                        pool2.push(element);
                        break;
                    case 3:
                        pool3.push(element);
                        break;
                }
            });
            setClientStateData1(pool1);
            setClientStateData2(pool2);
            setClientStateData3(pool3);
        }
    }

    //Processing the data from getClientStateData function
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    let cs2Aux = clientStateData2.sort((a,b) => a.pool_time_stamp_entry > b.pool_time_stamp_entry? 1 : -1);
    const client2 =  Object.values(cs2Aux).map(person => {
        let amountClient2 = parseFloat(person.pool_amount) / multiplier;
        let amountClient2Formatted = new Intl.NumberFormat("en-GB",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(amountClient2);
        let entryClient2 = (parseFloat(person.pool_time_stamp_entry)  + 5184000) * 1000;
        let date2 = new Date(entryClient2).toLocaleDateString("en-GB", options);
        let keyItem2 = person.pool_id.toString() + person.pool_amount.toString() +
            person.pool_time_stamp_last_collection.toString() + person.pool_amount.toString();
        return (
            <Row className="d-flex" key={keyItem2}>
                <Col xs={4}>
                    <span className="text-white font-size-xs">
                        {amountClient2Formatted} &nbsp;
                    </span>
                </Col>
                <Col xs={8}>
                    <span className="text-white font-size-xs">
                        &nbsp; Unlocks on {date2}
                    </span>
                </Col>
            </Row>
        )
    })

    let cs3Aux = clientStateData3.sort((a,b) => a.pool_time_stamp_entry > b.pool_time_stamp_entry? 1 : -1);
    const client3 =  Object.values(cs3Aux).map(person3 => {
        let amountClient3 = parseFloat(person3.pool_amount) / multiplier;
        let amountClient3Formatted = new Intl.NumberFormat("en-GB",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(amountClient3);
        let entryClient3 = (parseFloat(person3.pool_time_stamp_entry)  + 15552000) * 1000;
        let date3 = new Date(entryClient3).toLocaleDateString("en-GB", options);
        let keyItem3 = person3.pool_id.toString() + person3.pool_amount.toString() +
            person3.pool_time_stamp_last_collection.toString() + person3.pool_amount.toString();
        return (
            <Row className="d-flex" key={keyItem3}>
                <Col xs={4}>
                    <span className="text-white font-size-xs">
                        {amountClient3Formatted} &nbsp;
                    </span>
                </Col>
                <Col xs={8}>
                    <span className="text-white font-size-xs">
                        &nbsp; Unlocks on {date3}
                    </span>
                </Col>
            </Row>
        )
    })

    //Get Account Tokens Balance
    const [xlhBalance, setXlhBalance] = useState(0);
    const getWalletData = async () => {
        const newTokenList = await getAccountTokens(tokensAPI, tokens);
        if(newTokenList.xlh){
            setXlhBalance(newTokenList.xlh);
        }
    }

    //Set the amount of xlh for staking from the input or max button
    const [xlhAmountS, setXlhAmountS] = useState(0);
    const handleSliderChangeS = (value) => {
        setXlhAmountS(value);
    };
    const handleInputChangeS = (event) => {
        setXlhAmountS(event.target.value);
    };
    const setMaxAmountS = () => {
        setXlhAmountS(calc2(xlhBalance));
    }

    //Calculate the gas fee limits
    const clientStateDataGasFee = [clientStateData1, clientStateData2, clientStateData3];
    const gasLimits = [];
    clientStateDataGasFee.forEach((data) => {
        const gasLimit = calculateGasLimit(data);
        gasLimits.push(gasLimit);
    });

    //Stake Function settings
    const [transactionSessionId, setTransactionSessionId] = React.useState(null);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleOpen2 = () => setOpen2(true);
    const handleOpen3 = () => setOpen3(true);
    const handleClose = () => {
        setOpen1(false);
        setOpen2(false);
        setOpen3(false);
        setXlhAmountS(0);
    };

    //Set the amount of xlh for unstaking from the input or max button
    const [xlhAmountU, setXlhAmountU] = React.useState(0);
    const handleSliderChangeU = (value) => {
        setXlhAmountU(value);
    };
    const handleInputChangeU = (event) => {
        setXlhAmountU(event.target.value);
    };
    const setMaxAmountU = (maxU) => {
        setXlhAmountU(calc2(maxU));
    }

    //Unstake Function settings
    const [openU1, setOpenU1] = useState(false);
    const [openU2, setOpenU2] = useState(false);
    const [openU3, setOpenU3] = useState(false);
    const handleOpenU1 = () => setOpenU1(true);
    const handleOpenU2 = () => setOpenU2(true);
    const handleOpenU3 = () => setOpenU3(true);
    const handleCloseU = () => {
        setOpenU1(false);
        setOpenU2(false);
        setOpenU3(false);
        setXlhAmountU(0);
    };

    //
    const [openL1, setOpenL1] = useState(false);
    const [openL2, setOpenL2] = useState(false);
    const [openL3, setOpenL3] = useState(false);
    const handleOpenL1 = () => setOpenL1(true);
    const handleOpenL2 = () => setOpenL2(true);
    const handleOpenL3 = () => setOpenL3(true);
    const handleCloseL = () => {
        setOpenL1(false);
        setOpenL2(false);
        setOpenL3(false);
    };

    //Get the unstake time and amount for farm2/farm3
    const timestamp = Date.now();

    const getUnstakedData = (clientStateData, unlockTimeInSeconds) => {
        let unstakedAmount = 0;
        let unstakedEntry = "";
        let unlockedUnstake = true;
        let unlockedTime = "Unstake";
        const sortedData = clientStateData.sort((a,b) => a.pool_time_stamp_entry < b.pool_time_stamp_entry? 1 : -1);
        Object.values(sortedData).map(item => {
            const entry = (parseFloat(item.pool_time_stamp_entry) + unlockTimeInSeconds) * 1000;
            const unlockedTimeItem = (entry - timestamp) / 1000;
            if (unlockedTimeItem <= 0) {
                unlockedTime = "Unstake";
            } else if (unlockedTimeItem < 60) {
                unlockedTime = `Unstake (${Math.floor(unlockedTimeItem)}S)`;
            } else if (unlockedTimeItem < 3600) {
                unlockedTime = `Unstake (${Math.floor(unlockedTimeItem / 60)}M)`;
            } else if (unlockedTimeItem < 86400) {
                unlockedTime = `Unstake (${Math.floor(unlockedTimeItem / 3600)}H)`;
            } else {
                unlockedTime = `Unstake (${Math.floor(unlockedTimeItem / 86400)}D)`;
            }
            if (entry <= timestamp) {
                unstakedEntry = `Available from ${new Date(entry).toLocaleDateString("en-GB", options)}`;
                unstakedAmount += parseFloat(item.pool_amount) / multiplier;
                unlockedUnstake = false;
            }
        });
        return { unstakedAmount, unstakedEntry, unlockedUnstake, unlockedTime };
    }

    let { unstakedAmount: unstakedAmount2, unstakedEntry: unstakedEntry2, unlockedUnstake: unlockedUnstake2, unlockedTime: unlockedTime2 } = getUnstakedData(clientStateData2, 5184000);
    let { unstakedAmount: unstakedAmount3, unstakedEntry: unstakedEntry3, unlockedUnstake: unlockedUnstake3, unlockedTime: unlockedTime3 } = getUnstakedData(clientStateData3, 15552000);

    //Claim unstake
    const [claimUnstakedAmount, setClaimUnstakedAmount] = useState("0");
    const [claimUnstakedEntry, setClaimUnstakedEntry] = useState("");
    const [claimUnlockedUnstake, setClaimUnlockedUnstake] = useState(true);
    const [claimUnlockedTime, setClaimUnlockedTime] = useState("Claim Unstake");
    const getClientUnstakeStateData = async () => {
        const newClientUnstakeStateData = await contractQuery(
            networkProvider,
            stakeAbi,
            stakeScAddress,
            "XLauncherStaking",
            "getUnstakeState",
            [new AddressValue(new Address(address))]
        );

        if (newClientUnstakeStateData) {
            const entryCU = parseFloat(newClientUnstakeStateData.free_after_time_stamp) * 1000;
            const timeDiff = entryCU - timestamp;
            const unlockedTimeItemCUDays = Math.floor(timeDiff / 86400000);
            const unlockedTimeItemCUHours = Math.floor(timeDiff / 3600000) % 24;
            const unlockedTimeItemCUMinutes = Math.floor(timeDiff / 60000) % 60;
            const unlockedTimeItemCUSeconds = Math.floor(timeDiff / 1000) % 60;
            let claimUnlockedTime = '';

            if (timeDiff <= 0) {
                claimUnlockedTime = 'Claim Unstake';
            } else if (timeDiff < 60000) {
                claimUnlockedTime = `Claim Unstake (${unlockedTimeItemCUSeconds}S)`;
            } else if (timeDiff < 3600000) {
                claimUnlockedTime = `Claim Unstake (${unlockedTimeItemCUMinutes}M)`;
            } else if (timeDiff < 86400000) {
                claimUnlockedTime = `Claim Unstake (${unlockedTimeItemCUHours}H)`;
            } else {
                claimUnlockedTime = `Claim Unstake (${unlockedTimeItemCUDays}D)`;
            }

            const amountCU = parseFloat(newClientUnstakeStateData.requested_amount) / multiplier;
            const amountCUF = new Intl.NumberFormat('en-GB', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(amountCU);
            const entryCUTips = new Date(entryCU).toLocaleDateString('en-GB', options);
            const claimUnlockedUnstake = entryCU > timestamp;

            setClaimUnstakedAmount(amountCUF);
            setClaimUnstakedEntry(entryCUTips);
            setClaimUnlockedTime(claimUnlockedTime);
            setClaimUnlockedUnstake(claimUnlockedUnstake);
        } else {
            setClaimUnstakedAmount("0");
            setClaimUnstakedEntry('');
            setClaimUnlockedTime('Claim Unstake');
            setClaimUnlockedUnstake(true);
        }
    }

    //Calculate the farms apr for 3 days
    let apr1 = 0.0015 * clientReportData["farm1Amount"];
    let apr2 = 0.0072 * clientReportData["farm2Amount"];
    let apr3 = 0.0115 * clientReportData["farm3Amount"];

    if(!apr1) apr1 = 0;
    if(!apr2) apr2 = 0;
    if(!apr3) apr3 = 0;

    //Change the color for the earned xlh if can be claimed / reinvested
    let earned1Color1 = "white";
    let earned1Color2 = "white";
    let earned1Color3 = "white";
    if(clientReportData["farm1Rewards"] >= apr1 && clientReportData["farm1Rewards"] > 0){
        earned1Color1 = "lexaloffle-green";
    }
    if(clientReportData["farm2Rewards"] >= apr2 && clientReportData["farm2Rewards"] > 0){
        earned1Color2 = "lexaloffle-green";
    }
    if(clientReportData["farm3Rewards"] >= apr3 && clientReportData["farm3Rewards"] > 0){
        earned1Color3 = "lexaloffle-green";
    }

    //Disable claim and reinvest functions if xlh reward less than apr score, add events is amount is reached
    let disabledCR1 = true;
    let disabledCR2 = true;
    let disabledCR3 = true;
    if(clientReportData["farm1Rewards"] >= apr1 && clientReportData["farm1Rewards"] > 0){
        disabledCR1 = false;
    }
    if(clientReportData["farm2Rewards"] >= apr2 && clientReportData["farm2Rewards"] > 0){
        disabledCR2 = false;
    }
    if(clientReportData["farm3Rewards"] >= apr3 && clientReportData["farm3Rewards"] > 0){
        disabledCR3 = false;
    }

    //Disable stake, claim, reinvest, unstake and claim unstake if any transaction is active
    let unlockedStake1 = false;
    let unlockedStake2 = false;
    let unlockedStake3 = false;
    let unlockedUnstake1 = false;
    let unlockedCompleteUnstake = false;
    if(loadingTransactions){
        unlockedStake1 = true;
        unlockedStake2 = true;
        unlockedStake3 = true;
        disabledCR1 = true;
        disabledCR2 = true;
        disabledCR3 = true;
        unlockedUnstake1 = true;
        unlockedUnstake2 = true;
        unlockedUnstake3 = true;
        unlockedCompleteUnstake = true;
    }
    let unlockedCompleteUnstakeDisabled = false;
    if(claimUnlockedUnstake || unlockedCompleteUnstake){
        unlockedCompleteUnstakeDisabled = true;
    }

    let disabledStakeButton;
    disabledStakeButton = xlhAmountS === 0 || xlhAmountS > xlhBalance;

    let disabledUnstakeButton1;
    disabledUnstakeButton1 = xlhAmountU === 0 || xlhAmountU > clientReportData["farm1Amount"];

    let disabledUnstakeButton2;
    disabledUnstakeButton2 = xlhAmountU === 0 || xlhAmountU > clientReportData["farm2Amount"];

    let disabledUnstakeButton3;
    disabledUnstakeButton3 = xlhAmountU === 0 || xlhAmountU > clientReportData["farm3Amount"];

    //Show claim unstake widget if unstaked amount > 0
    let claimUnstakeWidget = "";

    useEffect(() => {
        if(isLoggedIn) {
            getClientReportData();
            getClientStateData();
            getClientUnstakeStateData();
            const interval = window.setInterval(() => {
                getWalletData();
                getClientReportData();
                getClientStateData();
                getClientUnstakeStateData();
            }, 2000);
            return () => window.clearInterval(interval);
        }
    }, []);

    return (
        <Layout>
            <p className="text-white font-bold mt-4 ms-2" style={{fontSize: '40px'}}>Staking</p>
            <Row>
                <Col xs="12" lg="4">
                    <StakingCard
                        title="Farm 1"
                        lockedTime="0 days locked"
                        apr="17%"
                        myXLH={clientReportData["farm1Amount"]}
                        unstakedAmount = {clientReportData["farm1Amount"]}
                        myRewards={clientReportData["farm1Rewards"]}
                        myRewardsColor={earned1Color1}
                        xlhBalance={xlhBalance}
                        modalFarmName="Farm 1"
                        lockedRewardsLabel = "&nbsp;"
                        mbv="11px"
                        stake={{
                            size: "sm",
                            color: "info",
                            label: "Stake",
                            disabled: unlockedStake1,
                            disabledAction:disabledStakeButton
                        }}
                        claim={{
                            size: "sm",
                            color: "primary",
                            label: "Claim",
                            hint: "Individual rewards can be claimed with a minimum of " + calc2(apr1) + " XLH",
                            disabled: disabledCR1
                        }}
                        reinvest={{
                            size: "sm",
                            color: "success",
                            label: "Reinvest",
                            hint: "Individual rewards can be reinvested with a minimum of " + calc2(apr1) + " XLH",
                            disabled: disabledCR1
                        }}
                        unstake={{
                            size: "sm",
                            color: "dark",
                            label: "Unstake",
                            hint: "Individual rewards can be claimed 10 days after unstake transaction",
                            disabled: unlockedUnstake1,
                            disabledAction:disabledUnstakeButton1
                        }}
                        methodS = {() => stakeXLH(1, xlhAmountS, stakeToken, stakeScAddress, setOpen1, setOpen2, setOpen3, setTransactionSessionId)}
                        maxMethodS = {() => setMaxAmountS()}
                        handleSliderChangeS = {e => handleSliderChangeS(e.target.value)}
                        handleInputChangeS = {e => handleInputChangeS(e)}
                        xlhAmountValueS = {xlhAmountS}
                        openS = {open1}
                        handleOpenS = {handleOpen1}
                        handleCloseS = {handleClose}
                        methodU = {() => unstakeXLH(1, xlhAmountU, gasLimits[0], stakeScAddress, setOpen1, setOpen2, setOpen3, setTransactionSessionId)}
                        maxMethodU = {() => setMaxAmountU(clientReportData["farm1Amount"])}
                        handleSliderChangeU = {e => handleSliderChangeU(e.target.value)}
                        handleInputChangeU = {e => handleInputChangeU(e)}
                        xlhAmountValueU = {xlhAmountU}
                        openU = {openU1}
                        handleOpenU = {handleOpenU1}
                        handleCloseU = {handleCloseU}
                        methodC = {() => claimXLH(1, gasLimits[0], stakeScAddress, setTransactionSessionId)}
                        methodR = {() => reinvestXLH(1, gasLimits[0], stakeScAddress, setTransactionSessionId)}
                        lockedRewards=""
                        openL = {openL1}
                        handleOpenL = {handleOpenL1}
                        handleCloseL = {handleCloseL}
                        isLoggedIn = {isLoggedIn}
                        showInfo = {false}
                    />
                </Col>
                <Col xs="12" lg="4">
                    <StakingCard
                        title="Farm 2"
                        lockedTime="60 days locked"
                        apr="60%"
                        myXLH={clientReportData["farm2Amount"]}
                        myRewards={clientReportData["farm2Rewards"]}
                        myRewardsColor={earned1Color2}
                        xlhBalance={xlhBalance}
                        unstakedAmount = {calc2(unstakedAmount2)}
                        lockedRewardsLabel = "My Locked XLH:"
                        mbv="-8px"
                        stake={{
                            size: "sm",
                            color: "info",
                            label: "Stake",
                            disabled: unlockedStake2,
                            disabledAction:disabledStakeButton
                        }}
                        claim={{
                            size: "sm",
                            color: "primary",
                            label: "Claim",
                            hint: "Individual rewards can be claimed with a minimum of " + calc2(apr2) + " XLH",
                            disabled: disabledCR2
                        }}
                        reinvest={{
                            size: "sm",
                            color: "success",
                            label: "Reinvest",
                            hint: "Individual rewards can be reinvested with a minimum of " + calc2(apr2) + " XLH",
                            disabled: disabledCR2
                        }}
                        unstake={{
                            size: "sm",
                            color: "dark",
                            label: unlockedTime2,
                            hint: "Individual rewards can be claimed 10 days after unstake transaction",
                            disabled: unlockedUnstake2,
                            disabledAction:disabledUnstakeButton2
                        }}
                        modalFarmName="Farm 2"
                        methodS = {() => stakeXLH(2, xlhAmountS, stakeToken, stakeScAddress, setOpen1, setOpen2, setOpen3, setTransactionSessionId)}
                        maxMethodS = {() => setMaxAmountS()}
                        handleSliderChangeS = {e => handleSliderChangeS(e.target.value)}
                        handleInputChangeS = {e => handleInputChangeS(e)}
                        xlhAmountValueS = {xlhAmountS}
                        openS = {open2}
                        handleOpenS = {handleOpen2}
                        handleCloseS = {handleClose}
                        methodU = {() => unstakeXLH(2, xlhAmountU, gasLimits[1], stakeScAddress, setOpen1, setOpen2, setOpen3, setTransactionSessionId)}
                        maxMethodU = {() => setMaxAmountU(calc2(unstakedAmount2))}
                        handleSliderChangeU = {e => handleSliderChangeU(e.target.value)}
                        handleInputChangeU = {e => handleInputChangeU(e)}
                        xlhAmountValueU = {xlhAmountU}
                        openU = {openU2}
                        handleOpenU = {handleOpenU2}
                        handleCloseU = {handleCloseU}
                        methodC = {() => claimXLH(2, gasLimits[1], stakeScAddress, setTransactionSessionId)}
                        methodR = {() => reinvestXLH(2, gasLimits[1], stakeScAddress, setTransactionSessionId)}
                        lockedRewards={client2}
                        openL = {openL2}
                        handleOpenL = {handleOpenL2}
                        handleCloseL = {handleCloseL}
                        isLoggedIn = {isLoggedIn}
                        showInfo = {true}
                    />
                </Col>
                <Col xs="12" lg="4">
                    <StakingCard
                        title="Farm 3"
                        lockedTime="180 days locked"
                        apr="100%"
                        myXLH={clientReportData["farm3Amount"]}
                        myRewards={clientReportData["farm3Rewards"]}
                        myRewardsColor={earned1Color3}
                        xlhBalance={xlhBalance}
                        unstakedAmount = {calc2(unstakedAmount3)}
                        lockedRewardsLabel = "My Locked XLH:"
                        mbv="-8px"
                        stake={{
                            size: "sm",
                            color: "info",
                            label: "Stake",
                            disabled: unlockedStake3,
                            disabledAction:disabledStakeButton
                        }}
                        claim={{
                            size: "sm",
                            color: "primary",
                            label: "Claim",
                            hint: "Individual rewards can be claimed with a minimum of " + calc2(apr3) + " XLH",
                            disabled: disabledCR3
                        }}
                        reinvest={{
                            size: "sm",
                            color: "success",
                            label: "Reinvest",
                            hint: "Individual rewards can be reinvested with a minimum of " + calc2(apr3) + " XLH",
                            disabled: disabledCR3
                        }}
                        unstake={{
                            size: "sm",
                            color: "dark",
                            label: unlockedTime3,
                            hint: "Individual rewards can be claimed 10 days after unstake transaction",
                            disabled: unlockedUnstake3,
                            disabledAction:disabledUnstakeButton3
                        }}
                        modalFarmName="Farm 3"
                        methodS = {() => stakeXLH(3, xlhAmountS, stakeToken, stakeScAddress, setOpen1, setOpen2, setOpen3, setTransactionSessionId)}
                        maxMethodS = {() => setMaxAmountS()}
                        handleSliderChangeS = {e => handleSliderChangeS(e.target.value)}
                        handleInputChangeS = {e => handleInputChangeS(e)}
                        xlhAmountValueS = {xlhAmountS}
                        openS = {open3}
                        handleOpenS = {handleOpen3}
                        handleCloseS = {handleClose}
                        methodU = {() => unstakeXLH(3, xlhAmountU, gasLimits[2], stakeScAddress, setOpen1, setOpen2, setOpen3, setTransactionSessionId)}
                        maxMethodU = {() => setMaxAmountU(calc2(unstakedAmount3))}
                        handleSliderChangeU = {e => handleSliderChangeU(e.target.value)}
                        handleInputChangeU = {e => handleInputChangeU(e)}
                        xlhAmountValueU = {xlhAmountU}
                        openU = {openU3}
                        handleOpenU = {handleOpenU3}
                        handleCloseU = {handleCloseU}
                        methodC = {() => claimXLH(3, gasLimits[2], stakeScAddress, setTransactionSessionId)}
                        methodR = {() => reinvestXLH(3, gasLimits[2], stakeScAddress, setTransactionSessionId)}
                        lockedRewards={client3}
                        openL = {openL3}
                        handleOpenL = {handleOpenL3}
                        handleCloseL = {handleCloseL}
                        isLoggedIn = {isLoggedIn}
                        showInfo = {true}
                    />
                </Col>
            </Row>
            {claimUnstakedAmount > 0 ? (
                <Row className="mt-5">
                    <Col xs={12} lg={4}>
                        <CompleteUnstakeCard
                            title = "Claim Unstaked XLH"
                            lockedTime = "10 days locked"
                            claimUnstakedAmount = {claimUnstakedAmount}
                            claimUnstakedEntry = {claimUnstakedEntry}
                            claimUnstake= {{
                                size: "small",
                                color: "info",
                                label: claimUnlockedTime,
                                disabled: unlockedCompleteUnstakeDisabled
                            }}
                            methodCU = {() => claimUXLH(3)}
                        />
                    </Col>
                </Row>
            ):(
                ''
            )}
        </Layout>
    );
}

export default Staking;
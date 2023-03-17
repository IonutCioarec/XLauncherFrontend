import { multiplier } from "utils/utilities";
import {TransactionPayload} from "@multiversx/sdk-core/out/transactionPayload";
import {BigUIntValue, ContractFunction} from "@multiversx/sdk-core/out";
import {BytesValue} from "@multiversx/sdk-core/out/smartcontracts/typesystem/bytes";
import {BigNumber} from "bignumber.js";
import { refreshAccount } from "@multiversx/sdk-dapp/utils/account";
import { sendTransactions} from "@multiversx/sdk-dapp/services";

//Stake function
export const stakeXLH = async (farmId, xlhAmount, token, scAddress, setOpen1, setOpen2, setOpen3, setTransactionSessionId) => {
    console.log("Formatting stake transaction");
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);

    let finalXLHAmount = xlhAmount * multiplier;
    let SData = TransactionPayload.contractCall()
        .setFunction(new ContractFunction("ESDTTransfer"))
        .setArgs([
            BytesValue.fromUTF8(token),
            new BigUIntValue(new BigNumber(finalXLHAmount)),
            BytesValue.fromUTF8("stake"),
            new BigUIntValue(new BigNumber(farmId)),
        ])
        .build().toString()

    const createStakeTransaction = {
        value: "0",
        data: SData,
        receiver: scAddress,
        gasLimit: 30000000,
    };

    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
        transactions: [createStakeTransaction],
        transactionsDisplayInfo: {
            processingMessage: "Stake Transaction",
            errorMessage: "An error has occured during Stake Transaction",
            successMessage: "Stake Transaction successful",
        },
        redirectAfterSign: false,
    });
    if (sessionId != null) {
        console.log("sessionId", sessionId);
        setTransactionSessionId(sessionId);
    }
};

//Unstake function
export const unstakeXLH = async (farmId, xlhAmount, gasLimit, scAddress, setOpen1, setOpen2, setOpen3, setTransactionSessionId) => {
    console.log("Formatting unstake transaction");
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);

    let finalXLHAmount = xlhAmount * multiplier;
    let UData = TransactionPayload.contractCall()
        .setFunction(new ContractFunction("unstake"))
        .setArgs([
            new BigUIntValue(new BigNumber(farmId)),
            new BigUIntValue(new BigNumber(finalXLHAmount)),
        ])
        .build().toString()

    const createUnstakeTransaction = {
        value: "0",
        data: UData,
        receiver: scAddress,
        gasLimit: gasLimit,
    };

    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
        transactions: [createUnstakeTransaction],
        transactionsDisplayInfo: {
            processingMessage: "Unstake Transaction",
            errorMessage: "An error has occured during Unstake Transaction",
            successMessage: "Unstake Transaction successful",
        },
        redirectAfterSign: false,
    });
    if (sessionId != null) {
        console.log("sessionIdU ", sessionId);
        setTransactionSessionId(sessionId);
    }
};

//Claim Function
export const claimXLH = async (farmId, gasLimit, scAddress, setTransactionSessionId) => {
    console.log("Formatting claim transaction");

    let CData = TransactionPayload.contractCall()
        .setFunction(new ContractFunction("claim"))
        .setArgs([
            new BigUIntValue(new BigNumber(farmId))
        ])
        .build().toString()

    const createClaimTransaction = {
        value: "0",
        data: CData,
        receiver: scAddress,
        gasLimit: gasLimit,
    };

    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
        transactions: [createClaimTransaction],
        transactionsDisplayInfo: {
            processingMessage: "Claim Transaction",
            errorMessage: "An error has occured during Claim Transaction",
            successMessage: "Claim Transaction successful",
        },
        redirectAfterSign: false,
    });
    if (sessionId != null) {
        console.log("sessionIdC ", sessionId);
        setTransactionSessionId(sessionId);
    }
};

//Reinvest Function
export const reinvestXLH = async (farmId, gasLimit, scAddress, setTransactionSessionId) => {
    console.log("Formatting reinvest transaction");

    let RData = TransactionPayload.contractCall()
        .setFunction(new ContractFunction("reinvest"))
        .setArgs([
            new BigUIntValue(new BigNumber(farmId))
        ])
        .build().toString()

    const createReinvestTransaction = {
        value: "0",
        data: RData,
        receiver: scAddress,
        gasLimit: gasLimit,
    };

    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
        transactions: [createReinvestTransaction],
        transactionsDisplayInfo: {
            processingMessage: "Reinvest Transaction",
            errorMessage: "An error has occured during Reinvest Transaction",
            successMessage: "Reinvest Transaction successful",
        },
        redirectAfterSign: false,
    });
    if (sessionId != null) {
        console.log("sessionId ", sessionId);
        setTransactionSessionId(sessionId);
    }
};

//Claim Unstake Function
export const claimUXLH = async (scAddress, setTransactionSessionId) => {
    console.log("Formatting claim unstake transaction");

    let CUData = TransactionPayload.contractCall()
        .setFunction(new ContractFunction("claimUnstakedValue"))
        .build().toString();

    const createClaimUTransaction = {
        value: "0",
        data: CUData,
        receiver: scAddress,
        gasLimit: 30000000,
    };

    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
        transactions: [createClaimUTransaction],
        transactionsDisplayInfo: {
            processingMessage: "Claim Unstake Transaction",
            errorMessage: "An error has occured during Claim Unstake Transaction",
            successMessage: "Claim Unstake Transaction successful",
        },
        redirectAfterSign: false,
    });
    if (sessionId != null) {
        console.log("sessionId ", sessionId);
        setTransactionSessionId(sessionId);
    }
};
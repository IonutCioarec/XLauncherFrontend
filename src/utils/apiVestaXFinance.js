import { multiplier } from "utils/utilities";
import {TransactionPayload} from "@multiversx/sdk-core/out/transactionPayload";
import {BigUIntValue, ContractFunction, U32Value} from "@multiversx/sdk-core/out";
import {BytesValue} from "@multiversx/sdk-core/out/smartcontracts/typesystem/bytes";
import {BigNumber} from "bignumber.js";
import { refreshAccount } from "@multiversx/sdk-dapp/utils/account";
import { sendTransactions} from "@multiversx/sdk-dapp/services";
import { contractQuery} from "utils/api";

//Mint Function
export const mintFunction = async (mintAmount, mintAddress, setTransactionSession) => {
    console.log("Formatting mint transaction");

    let data = TransactionPayload.contractCall()
        .setFunction(new ContractFunction("mint"))
        .setArgs([
            new U32Value(mintAmount),
        ])
        .build().toString();

    const createMintTransaction = {
        value: new BigNumber(0.85 * multiplier).multipliedBy(mintAmount).toFixed(),
        data: data,
        receiver: mintAddress,
        gasLimit: 20_000_000,
    };

    await refreshAccount();

    const { session /*, error*/ } = await sendTransactions({
        transactions: [createMintTransaction],
        transactionsDisplayInfo: {
            processingMessage: "Mint Transaction",
            errorMessage: "An error has occured during Mint Transaction",
            successMessage: "Mint Transaction successful",
        },
        redirectAfterSign: false,

    });
    if (session != null) {
        console.log("session ", session);
        setTransactionSession(session);
    }
};
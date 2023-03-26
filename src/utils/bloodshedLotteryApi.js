import {
    AbiRegistry,
    Address, BigUIntValue, ContractFunction,
    SmartContract,
    SmartContractAbi,
    TokenPayment,
    TransactionPayload,
    U8Value
} from "@multiversx/sdk-core/out";
import {refreshAccount} from "@multiversx/sdk-dapp/__commonjs/utils";
import {sendTransactions} from "@multiversx/sdk-dapp/services";
import {BigNumber} from "bignumber.js";

export const buyTickets = async (networkProvider, abiFile, scAddress, scName, chainID, token, amount) => {
    try {
        let abiRegistry = AbiRegistry.create(abiFile);
        let abi = new SmartContractAbi(abiRegistry, [scName]);
        let contract = new SmartContract({
            address: new Address(scAddress),
            abi: abi
        });

        const transaction = contract.methodsExplicit
            .confirmTickets([new U8Value(amount)])
            .withChainID(chainID)
            .withSingleESDTTransfer(
                TokenPayment.fungibleFromAmount(token, amount, 18)
            )
            .buildTransaction();
        const buyTicketsTransaction = {
            value: 0,
            data: Buffer.from(transaction.getData().valueOf()),
            receiver: scAddress,
            gasLimit: '15000000'
        };
        await refreshAccount();

        const { sessionId /*, error*/ } = await sendTransactions({
            transactions: buyTicketsTransaction,
            transactionsDisplayInfo: {
                processingMessage: 'Processing Buy Tickets transaction',
                errorMessage: 'An error has occured during Buy Tickets transaction',
                successMessage: 'Buy Tickets transaction successful'
            },
            redirectAfterSign: false
        });

    } catch (error) {
        console.error(error);
    }
};


export const claimResults = async (networkProvider, abiFile, scAddress, scName, chainID) => {
    try {
        let abiRegistry = AbiRegistry.create(abiFile);
        let abi = new SmartContractAbi(abiRegistry, [scName]);
        let contract = new SmartContract({
            address: new Address(scAddress),
            abi: abi
        });

        const transaction = contract.methodsExplicit
            .claimLotteryResults()
            .withChainID(chainID)
            .buildTransaction();
        const claimResultsTransaction = {
            value: 0,
            data: Buffer.from(transaction.getData().valueOf()),
            receiver: scAddress,
            gasLimit: '15000000'
        };
        await refreshAccount();

        const { sessionId /*, error*/ } = await sendTransactions({
            transactions: claimResultsTransaction,
            transactionsDisplayInfo: {
                processingMessage: 'Processing Claim Lottery Results transaction',
                errorMessage: 'An error has occured during Claim Lottery Results transaction',
                successMessage: 'Claim Lottery Results transaction successful'
            },
            redirectAfterSign: false
        });

    } catch (error) {
        console.error(error);
    }
};
export const networkId = "testnet";

export const customConfig = {
    mainnet: {
        apiAddress: 'https://api.multiversx.com',
        provider: 'https://gateway.multiversx.com',
        apiLink: 'https://api.multiversx.com/accounts/',
        token: 'XLH-8daa50',
        raffleScAddress: ""
    },

    devnet: {
        apiAddress: 'https://devnet-api.multiversx.com',
        provider: 'https://devnet-gateway.multiversx.com',
        apiLink: 'https://devnet-api.multiversx.com/accounts/',
        token: 'XLH-4f55ab',
        raffleScAddress: ""
    },

    testnet: {
        apiAddress: 'https://testnet-api.multiversx.com',
        provider: 'https://testnet-gateway.multiversx.com',
        apiLink: 'https://testnet-api.multiversx.com/accounts/',
        token: 'XLH-b7f529',
        raffleScAddress: "erd1qqqqqqqqqqqqqpgqd34vznmyferewyryetxxw0kg3q968e68qqes84r3w8"
    }
};

export const allTokens = {
    mainnet: {
        xlh: 'XLH-8daa50'
    },

    devnet: {
        //xlh: 'XLH-4f55ab'
        xlh: 'XLH-4a7cc0'
    },

    testnet: {
        //xlh: 'XLH-cb26c7'
        xlh: 'XLH-b7f529'
    }
};

export const defaultWalletData = {
    tokens: {
        xlh: 0
    },
    nfts: {
        xlhOrigins: {
            rust: 0,
            bronze: 0,
            silver: 0,
            gold: 0,
            platinum: 0,
            legendary: 0
        }
    }
}
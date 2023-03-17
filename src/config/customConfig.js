export const networkId = "mainnet";

export const customConfig = {
    mainnet: {
        apiAddress: 'https://api.multiversx.com',
        provider: 'https://gateway.multiversx.com',
        apiLink: 'https://api.multiversx.com/accounts/',
        token: 'XLH-8daa50',
        stakeAddress: "erd1qqqqqqqqqqqqqpgql0yx4uetca8g4wmr96d9z7094vj3uhpt4d6qm5srfk"
    },

    devnet: {
        apiAddress: 'https://devnet-api.multiversx.com',
        provider: 'https://devnet-gateway.multiversx.com',
        apiLink: 'https://devnet-api.multiversx.com/accounts/',
        token: 'XLH-4a7cc0',
        stakeAddress: "erd1qqqqqqqqqqqqqpgqxmeg3k0ty84hm3f8n9wdfpukspc0asj3pa7qtt6j0t"
    },

    testnet: {
        apiAddress: 'https://testnet-api.multiversx.com',
        provider: 'https://testnet-gateway.multiversx.com',
        apiLink: 'https://testnet-api.multiversx.com/accounts/',
        token: 'XLH-b7f529',
        stakeAddress: "erd1qqqqqqqqqqqqqpgqdw9gatcwzlsdtvjwu3mveln57g0quyzzpa7q9jg84s"
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
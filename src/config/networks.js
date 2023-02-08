// Default multiversx network configuration (constants).
// Change if you need, but by default, you shouldn't have to do that.

export const DEFAULT_MIN_GAS_LIMIT = 50_000;

export const DAPP_CONFIG_ENDPOINT = '/dapp/config';
export const DAPP_INIT_ROUTE = '/dapp/init';

export const chainType = 'devnet';

export const networkConfig = {
    devnet: {
        skipFetchFromServer: true,
        id: 'devnet',
        shortId: 'D',
        name: 'Devnet',
        egldLabel: 'xEGLD',
        egldDenomination: '18',
        decimals: '4',
        gasPerDataByte: '1500',
        walletConnectDeepLink:
            'https://maiar.page.link/?apn=com.multiversx.maiar.wallet&isi=1519405832&ibi=com.multiversx.maiar.wallet&link=https://maiar.com/',
        walletConnectBridgeAddresses: ['https://bridge.walletconnect.org'],
        walletAddress: 'https://devnet-wallet.multiversx.com',
        apiAddress: 'https://devnet-api.multiversx.com',
        explorerAddress: 'https://devnet-explorer.multiversx.com',
        apiTimeout: '4000',
    },

    testnet: {
        skipFetchFromServer: true,
        id: 'testnet',
        shortId: 'T',
        name: 'Testnet',
        egldLabel: 'xEGLD',
        egldDenomination: '18',
        decimals: '4',
        gasPerDataByte: '1500',
        walletConnectDeepLink:
            'https://maiar.page.link/?apn=com.multiversx.maiar.wallet&isi=1519405832&ibi=com.multiversx.maiar.wallet&link=https://maiar.com/',
        walletConnectBridgeAddresses: ['https://bridge.walletconnect.org'],
        walletAddress: 'https://testnet-wallet.multiversx.com',
        apiAddress: 'https://testnet-api.multiversx.com',
        explorerAddress: 'https://testnet-explorer.multiversx.com',
        apiTimeout: '4000',
    },

    mainnet: {
        skipFetchFromServer: true,
        id: 'mainnet',
        shortId: '1',
        name: 'Mainnet',
        egldLabel: 'EGLD',
        egldDenomination: '18',
        decimals: '4',
        gasPerDataByte: '1500',
        walletConnectDeepLink:
            'https://maiar.page.link/?apn=com.multiversx.maiar.wallet&isi=1519405832&ibi=com.multiversx.maiar.wallet&link=https://maiar.com/',
        walletConnectBridgeAddresses: ['https://bridge.walletconnect.org'],
        walletAddress: 'https://wallet.multiversx.com',
        apiAddress: 'https://api.multiversx.com',
        explorerAddress: 'https://explorer.multiversx.com',
        apiTimeout: '4000',
    },
};

export const getActiveNetworkConfiguration = () => {
    return networkConfig[chainType];
};
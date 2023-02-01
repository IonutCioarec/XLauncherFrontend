import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks/account";

export function Account() {
    const { address, account } = useGetAccountInfo();
    const isLoggedIn = Boolean(address);

    return {
        address: address,
        isLoggedIn: isLoggedIn
    }
}
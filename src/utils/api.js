import {multiplier, calc2} from "utils/utilities";

//API to get the logged in account tokens
export const getAccountTokens = async (tokensAPI, tokens) => {
    let tokenList = Object.fromEntries(
        Object.entries(tokens).map(([key, value]) => [key, 0])
    );
    try {
        const response = await fetch(tokensAPI, {
            headers: {
                'Accept': 'application/json',
            }
        });
        const json = await response.json();

        let keys = Object.keys(tokens);
        let provTokenList = [];
        json.forEach(item => {
            for(let index = 0; index < keys.length; index++){
                if(item.identifier === tokens[keys[index]]){
                    let currKey = keys[index];
                    let currVal = 0;
                    if(item.balance/multiplier){
                        currVal = calc2(item.balance/multiplier);
                    }
                    let currItem = {[currKey]:currVal};
                    provTokenList.push(currItem);
                }
            }
        })
        for(let i = 0; i < provTokenList.length; i++ ) {
            Object.assign(tokenList, provTokenList[i]);
        }
        return tokenList;
    } catch (error) {
        console.error("error " + error);
    }
}

//API to get the xlh origins nfts of the logged in account
export const getAccountNFTS = async (nftAPI) => {
    try {
        const response = await fetch(
            nftAPI,
            {
                headers: {
                    'Accept': 'application/json'
                }
            });
        const json = await response.json();
        let countRust = 0;
        let countBronze = 0;
        let countSilver = 0;
        let countGold = 0;
        let countPlatinum = 0;
        let countLegendary = 0;
        if(json){
            json.forEach(item => {
                let nftSwitcher = item.metadata.attributes[3].value;
                switch (nftSwitcher) {
                    case "rust":
                        countRust += 1;
                        break;
                    case "bronze":
                        countBronze += 1;
                        break;
                    case "silver":
                        countSilver += 1;
                        break;
                    case "gold":
                        countGold += 1;
                        break;
                    case "platinum":
                        countPlatinum += 1;
                        break;
                    case "Orange":
                        countLegendary += 1;
                        break;
                    default: console.log("No NFT founded");
                        break;
                }
            })
            return ({
                rust: countRust,
                bronze: countBronze,
                silver: countSilver,
                gold: countGold,
                platinum: countPlatinum,
                legendary: countLegendary
            })
        }
    } catch (error) {
        console.error("error " + error);
    }
}
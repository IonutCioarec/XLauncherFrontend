import BigNumber from "bignumber.js";

export var multiplier = 1000000000000000000;

//Returns a float with 0 decimals
export function calc0(item) {
    let withNoDecimals = item.toString().match(/^-?\d+(?:\\d{0})?/)[0];
    return parseFloat(withNoDecimals);
}

//Returns a float with 1 decimal
export function calc1(item) {
    let with1Decimal = item.toString().match(/^-?\d+(?:\.\d{0,1})?/)[0];
    return parseFloat(with1Decimal);
}

//Returns a float with 2 decimals
export function calc2(item) {
    let with2Decimals = item.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
    return parseFloat(with2Decimals);
}

//Returns a float with 3 decimals
export function calc3(item) {
    let with3Decimals = item.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0];
    return parseFloat(with3Decimals);
}

//Converts big number to date
export function convertBigNumberToDate(big) {
    return new Date(big.toNumber() * 1000);
}

export const convertWeiToEsdt = (amount, decimals, precision) => {
    if (amount == null) {
        return BigNumber(0);
    } else {
        return BigNumber(amount).shiftedBy(typeof(decimals) !== 'undefined' ? -decimals : -18).decimalPlaces(typeof(precision) !== 'undefined' ? precision : 4, BigNumber.ROUND_DOWN);
    }
};

//Calculate the gas fee limit
export function calculateGasLimit(clientStateData) {
    const countItems = Object.keys(clientStateData).length;
    const n = countItems * (countItems + 1) / 2;
    const l = 80000 * (10 * countItems + n) + 10000000 + (1000000 * countItems);
    let gasLimit = 10000000;

    if (l >= 10000000 && l < 30000000) {
        gasLimit = 50000000;
    } else if (l >= 20000000 && l < 30000000) {
        gasLimit = 70000000;
    } else if (l >= 30000000 && l < 60000000) {
        gasLimit = 90000000;
    } else if (l >= 60000000 && l < 100000000) {
        gasLimit = 200000000;
    } else if (l >= 100000000) {
        gasLimit = 600000000;
    }

    return gasLimit;
}

//Format number
export function intlNumberFormat(number, locales, minDigits, maxDigits){
    return new Intl.NumberFormat(locales? locales : "en-GB", {
        minimumFractionDigits: minDigits? minDigits : 2,
        maximumFractionDigits: maxDigits? maxDigits : 2,
    }).format(number);
}

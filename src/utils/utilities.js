import React from "react";

export var egldMultiplier = 1000000000000000000;

//Returns a float with 0 decimals
export function calc0(theform) {
    var withNoDecimals = theform.toString().match(/^-?\d+(?:\\d{0})?/)[0];
    return parseFloat(withNoDecimals);
}

//Returns a float with 1 decimal
export function calc1(theform) {
    var with1Decimal = theform.toString().match(/^-?\d+(?:\.\d{0,1})?/)[0];
    return parseFloat(with1Decimal);
}

//Returns a float with 2 decimals
export function calc2(theform) {
    var with2Decimals = theform.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
    return parseFloat(with2Decimals);
}

//Returns a float with 3 decimals
export function calc3(theform) {
    var with3Decimals = theform.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0];
    return parseFloat(with3Decimals);
}

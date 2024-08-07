import {BillDenominationTypes, CoinDenominationTypes} from "./domain";

export function sumBalance(balance) {
    let sum = 0;
    for (const denonimation in BillDenominationTypes) {
        if (balance[denonimation]?.count) {
            sum += balance[denonimation].count * BillDenominationTypes[denonimation].value;
        }
    }
    for (const denonimation in CoinDenominationTypes) {
        const type = CoinDenominationTypes[denonimation];
        if (balance[denonimation]?.count) {
            sum += balance[denonimation].count * type.value;
        } else if (balance[denonimation]?.weight) {
            sum += Math.round(balance[denonimation].weight / type.gramsPerCoin) * type.value;
        }
    }
    return sum;
}
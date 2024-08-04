import {BillDenominationTypes, CoinDenominationTypes} from "./domain";
import {BillCountInput} from "./billCountInput";
import {CoinInput} from "./coinInput";
import React from "react";

export function BalanceInputForm({balance, setBalance}) {
    function setDenomination(denomination, value) {
        setBalance(old => ({
            ...old,
            [denomination]: value
        }));
    }

    return <>
        {Object.keys(BillDenominationTypes).map(d =>
            <BillCountInput
                key={d}
                value={balance[d] || {}}
                setValue={value => setDenomination(d, value)}
                billType={BillDenominationTypes[d]}
            />
        )}
        {Object.keys(CoinDenominationTypes).map(d =>
            <CoinInput
                key={d}
                value={balance[d] || {}}
                setValue={value => setDenomination(d, value)}
                coinType={CoinDenominationTypes[d]}
            />
        )}
    </>;
}
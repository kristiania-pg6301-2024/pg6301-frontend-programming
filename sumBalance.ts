const BillTypeValues = [
  { key: "1000kr", value: 1000 },
  { key: "500kr", value: 500 },
  { key: "200kr", value: 200 },
  { key: "100kr", value: 100 },
  { key: "50kr", value: 50 },
] as const;
type BillType = (typeof BillTypeValues)[number];
type BillTypeDenomination = BillType["key"];

const CoinTypeValues = [
  { key: "20kr", value: 20, gramsPerCoin: 9.9 },
  { key: "10kr", value: 10, gramsPerCoin: 6.8 },
] as const;
type CoinType = (typeof CoinTypeValues)[number];
type CoinTypeDenomination = CoinType["key"];

interface CoinAmount {
  count?: number;
  grams?: number;
}

type CashSettlement = Partial<Record<BillTypeDenomination, number>> &
  Partial<Record<CoinTypeDenomination, CoinAmount>>;

export function sumBalance(cashSettlement: CashSettlement): number {
  let result = 0;
  for (const { key, value } of BillTypeValues) {
    result += (cashSettlement[key] || 0) * value;
  }
  for (const { key, value, gramsPerCoin } of CoinTypeValues) {
    if (cashSettlement[key]) {
      result +=
        (cashSettlement[key].count || 0) * value +
        Math.round((cashSettlement[key].grams || 0) / gramsPerCoin) * value;
    }
  }
  return result;
}

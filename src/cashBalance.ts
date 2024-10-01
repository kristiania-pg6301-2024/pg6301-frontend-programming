export const billTypes = [
  { key: "50kr", value: 50 },
  { key: "100kr", value: 100 },
  { key: "200kr", value: 200 },
  { key: "500kr", value: 500 },
  { key: "1000kr", value: 1000 },
] as const;
type BillDenomination = (typeof billTypes)[number]["key"];

export const coinTypes = [
  { key: "20kr", value: 20, gramsPerCoin: 9.9 },
  { key: "10kr", value: 10, gramsPerCoin: 6.8 },
  { key: "5kr", value: 5, gramsPerCoin: 7.85 },
  { key: "1kr", value: 1, gramsPerCoin: 4.35 },
] as const;
export type CoinType = (typeof coinTypes)[number];
type CoinDenomination = CoinType["key"];

export type CashBalance = Partial<Record<BillDenomination, number>> &
  Partial<Record<CoinDenomination, { count: number } | { grams: number }>>;

export function sumBalance(balance: CashBalance) {
  let sum = 0;
  for (const { key, value } of billTypes) {
    sum += (balance[key] || 0) * value;
  }
  for (const { gramsPerCoin, key, value } of coinTypes) {
    let coin = balance[key];
    if (coin && "count" in coin) {
      sum += coin.count * value;
    } else if (coin) {
      sum += Math.round(coin.grams / gramsPerCoin) * value;
    }
  }
  return sum;
}

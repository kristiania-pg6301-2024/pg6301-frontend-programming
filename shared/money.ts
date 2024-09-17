type BillDenomination = "1000kr" | "500kr" | "100kr" | "50kr";
const BillTypes = [
  { key: "1000kr", value: 1000 },
  { key: "500kr", value: 500 },
  { key: "100kr", value: 100 },
  { key: "50kr", value: 50 },
];
type CoinDenomination = "20kr" | "10kr";
const CoinTypes = [
  { key: "20kr", value: 20, gramsPerCoin: 9.9 },
  { key: "10kr", value: 10 },
];
type Coins = { grams: number } | { count: number };
type Balance = Partial<Record<BillDenomination, number>> &
  Partial<Record<CoinDenomination, Coins>>;

export function sumBalance(balance: Balance): number {
  let sum = 0;
  for (const billType of BillTypes) {
    if (billType.key in balance) {
      sum += balance[billType.key] * billType.value;
    }
  }
  for (const coinType of CoinTypes) {
    if (coinType.key in balance) {
      const amount: Coins = balance[coinType.key];
      if ("grams" in amount) {
        sum += (amount.grams / coinType.gramsPerCoin) * coinType.value;
      } else {
        sum += amount.count * coinType.value;
      }
    }
  }
  return sum;
}

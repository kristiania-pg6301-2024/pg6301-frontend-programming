type BillDenomination = "1000kr" | "500kr" | "100kr" | "50kr";
const BillTypes: {
  key: BillDenomination;
  value: number;
}[] = [
  { key: "1000kr", value: 1000 },
  { key: "500kr", value: 500 },
  { key: "100kr", value: 100 },
  { key: "50kr", value: 50 },
];
type CoinDenomination = "20kr" | "10kr";
const CoinTypes: {
  key: CoinDenomination;
  value: number;
  gramsPerCoin: number;
}[] = [
  { key: "20kr", value: 20, gramsPerCoin: 9.9 },
  { key: "10kr", value: 10, gramsPerCoin: 6.8 },
];
type Coins = { grams: number } | { count: number };
type Balance = Partial<Record<BillDenomination, number>> &
  Partial<Record<CoinDenomination, Coins>>;

export function sumBalance(balance: Balance): number {
  let sum = 0;
  for (const billType of BillTypes) {
    sum += (balance[billType.key] || 0) * billType.value;
  }
  for (const coinType of CoinTypes) {
    const coins: Coins = balance[coinType.key] || { count: 0 };
    if ("grams" in coins) {
      sum += (coins.grams / coinType.gramsPerCoin) * coinType.value;
    } else {
      sum += coins.count * coinType.value;
    }
  }
  return sum;
}

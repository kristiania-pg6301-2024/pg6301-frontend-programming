const billTypes = [
  { key: "50kr", value: 50 },
  { key: "100kr", value: 100 },
  { key: "200kr", value: 200 },
  { key: "500kr", value: 500 },
  { key: "1000kr", value: 1000 },
] as const;
type BillDenomination = (typeof billTypes)[number]["key"];

type CashBalance = Partial<Record<BillDenomination, number>>;

export function sumBalance(balance: CashBalance) {
  let sum = 0;
  for (const billType of billTypes) {
    sum += (balance[billType.key] || 0) * billType.value;
  }
  return sum;
}

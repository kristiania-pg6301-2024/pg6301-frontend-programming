type BillDenomination = "50kr" | "1000kr";

interface BillType {
  key: BillDenomination;
  value: number;
}

const billTypes: BillType[] = [
  { key: "50kr", value: 50 },
  { key: "1000kr", value: 1000 },
];

type CashBalance = Partial<Record<BillDenomination, number>>;

export function sumBalance(balance: CashBalance) {
  let sum = 0;
  for (const billType of billTypes) {
    sum += (balance[billType.key] || 0) * billType.value;
  }
  return sum;
}

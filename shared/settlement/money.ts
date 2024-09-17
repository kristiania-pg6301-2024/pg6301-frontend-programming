export type Denominations =
  | "1000kr"
  | "500kr"
  | "200kr"
  | "100kr"
  | "50kr"
  | "20kr"
  | "10kr"
  | "5kr"
  | "1kr";

export const billTypes: {
  key: Denominations;
  value: number;
  label: string;
}[] = [
  { key: "1000kr", value: 1000, label: "1000-lapper" },
  { key: "500kr", value: 500, label: "500-lapper" },
  { key: "200kr", value: 200, label: "200-lapper" },
  { key: "100kr", value: 100, label: "100-lapper" },
  { key: "50kr", value: 50, label: "50-lapper" },
];

export interface CoinType {
  key: Denominations;
  value: number;
  label: string;
  gramsPerCoin: number;
}

export const coinTypes: CoinType[] = [
  { key: "20kr", value: 20, label: "20-kroning", gramsPerCoin: 9.9 },
  { key: "10kr", value: 10, label: "10-kroning", gramsPerCoin: 6.8 },
  { key: "5kr", value: 5, label: "5-kroning", gramsPerCoin: 7.85 },
  { key: "1kr", value: 1, label: "kronestykker", gramsPerCoin: 4.35 },
];

export interface SettlementReport {
  id: number;
  selectedDepartment: string;
  balance: Balance;
}

export type Balance = Partial<Record<Denominations, number>>;

export function sumBalance(balance: Balance): number {
  let result = 0;
  for (const denomination of billTypes) {
    if (denomination.key in balance) {
      result += denomination.value * (balance[denomination.key] || 0);
    }
  }
  for (const denomination of coinTypes) {
    if (denomination.key in balance) {
      result += denomination.value * (balance[denomination.key] || 0);
    }
  }
  return result;
}

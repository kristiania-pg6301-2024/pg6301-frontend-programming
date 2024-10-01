type BillDenominations = "50kr" | "1000kr";

type CashBalance = Record<BillDenominations, number>;

export function sumBalance(balance: CashBalance) {
  return 1000 * (balance["1000kr"] || 0) + 50 * (balance["50kr"] || 0);
}

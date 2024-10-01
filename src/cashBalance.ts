interface CashBalance {
  "50kr"?: number;
  "1000kr"?: number;
}

export function sumBalance(balance: CashBalance) {
  return 1000 * (balance["1000kr"] || 0) + 50 * (balance["50kr"] || 0);
}

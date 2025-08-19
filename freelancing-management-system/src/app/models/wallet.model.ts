import { Transaction } from "./transaction.model";

export interface Wallet {
  id: number;
  userId: number;
  balance: number;
  transactions: Transaction[];
}

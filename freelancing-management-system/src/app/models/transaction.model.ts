export interface Transaction {
  id?: number;
  //walletId?: number;
  wallet?: { id: number };
  amount: number;
  type: 'credit' | 'debit';
  description: string;
 // date: string;
  date: string | Date;
}

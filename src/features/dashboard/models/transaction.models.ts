export interface Transaction {
	id: string;
	description: string;
	amount: number;
	date: string;
	type: 'credit' | 'debit';
}

export type TOperation = Omit<Transaction, 'description'> & { description?: string };

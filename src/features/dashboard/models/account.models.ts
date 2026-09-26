export type TAccount = {
	id: string;
	name: string;
	balance: number;
	type: 'PRIVATE' | 'BUSINESS';
	iban: string;
};

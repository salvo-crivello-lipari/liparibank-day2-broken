import { Transaction } from '../models/transaction.models';

export const mockTransactions: Transaction[] = [
	{ id: 'tx-001', description: 'Stipendio Novembre', amount: 2400.0, date: '2024-11-30', type: 'credit' },
	{ id: 'tx-002', description: 'Affitto Dicembre', amount: -850.0, date: '2024-12-01', type: 'debit' },
	{ id: 'tx-003', description: 'Supermercato Conad', amount: -67.4, date: '2024-12-03', type: 'debit' },
	{ id: 'tx-004', description: 'Rimborso spese aziendali', amount: 320.0, date: '2024-12-05', type: 'credit' },
	{ id: 'tx-005', description: 'Bolletta Enel', amount: -112.8, date: '2024-12-07', type: 'debit' },
];

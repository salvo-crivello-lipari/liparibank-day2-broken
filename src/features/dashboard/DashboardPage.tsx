import { useState } from 'react';
import AccountBalanceCard from './components/AccountBalanceCard/AccountBalanceCard';
import RecentTransactions from './components/RecentTransactions/RecentTransactions';
import styles from './DashboardPage.module.css';
import OperationHistory from './components/OperationHistory/OperationHistory';
import useFetchOperation from './hooks/useTransactionOperation';
import { TAccount } from './models/account.models';
import { mockAccount } from './constants/constant';

const DashboardPage = () => {
	const { addOperation, operations, loading } = useFetchOperation();
	const [account, setAccount] = useState<TAccount>(mockAccount);

	const refreshBalance = async (accountId: string) => {
		console.log('Aggiornamento conto:', accountId);
		await new Promise((resolve) => setTimeout(resolve, 1500));

		const delta = Math.random() * 200 - 100;
		setAccount((prev) => ({
			...prev,
			balance: Math.round((prev.balance + delta) * 100) / 100,
		}));
		const type = delta >= 0 ? 'credit' : 'debit';
		const amount = Math.abs(delta);
		addOperation(type, amount);
	};

	const viewTransactions = (accountId: string) => {
		console.log('Visualizza movimenti:', accountId);
	};

	const deposit = () => {
		const amount = 100;
		addOperation('credit', amount);
		setAccount((prev) => ({
			...prev,
			balance: prev.balance + amount,
		}));
	};

	const withdraw = () => {
		const amount = 100;
		addOperation('debit', amount);
		setAccount((prev) => ({
			...prev,
			balance: prev.balance - amount,
		}));
	};

	return (
		<div className={styles.page}>
			<div className={styles.welcome}>
				<h1 className={styles.welcomeTitle}>Dashboard</h1>
				<p className={styles.welcomeSubtitle}>Riepilogo della tua situazione finanziaria aggiornata in tempo reale.</p>
			</div>
			<div className={styles.buttonRow}>
				<button className={styles.opButton} onClick={deposit}>
					Deposita €100
				</button>
				<button className={`${styles.opButton} ${styles.opButtonSecondary}`} onClick={withdraw}>
					Preleva €100
				</button>
			</div>

			<div className={styles.grid}>
				<AccountBalanceCard account={account} onRefreshBalance={refreshBalance} onViewTransactions={viewTransactions} />
				<RecentTransactions />
				<OperationHistory operations={operations} loading={loading} />
			</div>
		</div>
	);
};

export default DashboardPage;

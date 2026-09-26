import { useState, useEffect } from 'react';
import AccountBalanceCard from './components/AccountBalanceCard/AccountBalanceCard';
import RecentTransactions from './components/RecentTransactions/RecentTransactions';
import styles from './DashboardPage.module.css';
import OperationHistory from './components/OperationHistory/OperationHistory';
import useFetchOperation from './hooks/useTransactionOperation';

const DashboardPage = () => {
	const [balance, setBalance] = useState(4250.0);
	const { addOperation, operations, loading } = useFetchOperation();

	useEffect(() => {
		const interval = setInterval(() => {
			const delta = Math.random() * 200 - 100;
			setBalance((prev) => {
				return Math.round((prev + delta) * 100) / 100;
			});

			const type = delta >= 0 ? 'credit' : 'debit';
			const amount = Math.abs(delta);
			addOperation(type, amount);
		}, 3000);

		return () => clearInterval(interval);
	}, [addOperation]);

	const deposit = () => {
		const amount = 100;
		addOperation('credit', amount);
		setBalance((prev) => prev + amount);
	};
	const withdraw = () => {
		const amount = 100;
		addOperation('debit', amount);
		setBalance((prev) => prev - amount);
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
				<AccountBalanceCard balance={balance} />
				<RecentTransactions />
				<OperationHistory operations={operations} loading={loading} />
			</div>
		</div>
	);
};

export default DashboardPage;

import { useState } from 'react';
import AccountBalanceCard from './components/AccountBalanceCard/AccountBalanceCard';
import RecentTransactions from './components/RecentTransactions/RecentTransactions';
import styles from './DashboardPage.module.css';
import OperationHistory from './components/OperationHistory/OperationHistory';
import useFetchOperation from './hooks/useTransactionOperation';
import { useInterval } from '../../hooks/useInterval';
import { TAccount } from './models/account.models';
import { mockAccount } from './constants/constant';
import { generateBalanceChange } from './utils';
import AutoRefreshControl from './components/AutoRefreshControl/AutoRefreshControl';

const DashboardPage = () => {
	const { addOperation, operations, loading } = useFetchOperation();
	const [account, setAccount] = useState<TAccount>(mockAccount);
	const [isRunning, setIsRunning] = useState(true);
	useInterval(applyBalanceChange, isRunning ? 5000 : null);

	function applyBalanceChange() {
		const { delta, type, amount } = generateBalanceChange();
		setAccount((prev) => ({
			...prev,
			balance: Math.round((prev.balance + delta) * 100) / 100,
		}));
		addOperation(type, amount);
	}

	const refreshBalance = async (accountId: string) => {
		console.log('Aggiornamento conto:', accountId);
		await new Promise((resolve) => setTimeout(resolve, 1500));
		applyBalanceChange();
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
				<AutoRefreshControl isRunning={isRunning} onToggle={() => setIsRunning((prev) => !prev)} />
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

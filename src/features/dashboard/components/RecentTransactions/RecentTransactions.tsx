import { useState, useEffect, memo } from 'react';
import styles from './RecentTransactions.module.css';
import { Transaction } from '../../models/transaction.models';
import { mockTransactions } from '../../constants/constant';
import TransactionItem from '../TransactionItem/TransactionItem';
import LoadingState from '../LoadingState/LoadingState';

const RecentTransactions = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => {
			setTransactions(mockTransactions);
			setLoading(false);
		}, 600);

		return () => clearTimeout(timer);
	}, []);

	if (loading) return <LoadingState />;

	return (
		<div className={styles.card}>
			<h3 className={styles.title}>Movimenti Recenti</h3>
			<ul className={styles.list}>
				{transactions.map((tx) => (
					<TransactionItem key={tx.id} transaction={tx} />
				))}
			</ul>
		</div>
	);
};

export default memo(RecentTransactions);

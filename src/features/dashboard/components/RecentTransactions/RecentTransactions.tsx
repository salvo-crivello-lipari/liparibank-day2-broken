import { useState, useEffect, memo } from 'react';
import styles from './RecentTransactions.module.css';
import { Transaction } from '../../models/transaction.models';
import { mockTransactions } from '../../constants/constant';
import { formatAmount, formatDate } from '../../utils';

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

	if (loading) {
		return (
			<div className={styles.card}>
				<h3 className={styles.title}>Movimenti Recenti</h3>
				<div className={styles.loading}>Caricamento movimenti...</div>
			</div>
		);
	}

	return (
		<div className={styles.card}>
			<h3 className={styles.title}>Movimenti Recenti</h3>
			<ul className={styles.list}>
				{transactions.map((tx) => (
					<li key={tx.id} className={styles.item}>
						<div className={styles.itemLeft}>
							<span className={`${styles.badge} ${styles[tx.type]}`}>
								{tx.type === 'credit' ? 'Accredito' : 'Addebito'}
							</span>
							<span className={styles.description}>{tx.description}</span>
						</div>
						<div className={styles.itemRight}>
							<span className={`${styles.amount} ${tx.type === 'credit' ? styles.amountCredit : styles.amountDebit}`}>
								{tx.type === 'credit' ? '+' : '−'} {formatAmount(tx.amount)}
							</span>
							<span className={styles.date}>{formatDate(tx.date)}</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default memo(RecentTransactions);

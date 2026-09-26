import { TOperation } from '../../models/transaction.models';
import { formatAmount, formatDate } from '../../utils';
import styles from './OperationHistory.module.css';

type TOperationHistoryProps = { operations: TOperation[]; loading: boolean };

const OperationHistory = ({ operations, loading }: TOperationHistoryProps) => {
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
				{operations.map((operation) => (
					<li key={operation.id} className={styles.item}>
						<div className={styles.itemLeft}>
							<span className={`${styles.badge} ${styles[operation.type]}`}>
								{operation.type === 'credit' ? 'Accredito' : 'Addebito'}
							</span>
						</div>
						<div className={styles.itemRight}>
							<span
								className={`${styles.amount} ${operation.type === 'credit' ? styles.amountCredit : styles.amountDebit}`}
							>
								{operation.type === 'credit' ? '+' : '−'} {formatAmount(operation.amount)}
							</span>
							<span className={styles.date}>{formatDate(operation.date)}</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default OperationHistory;

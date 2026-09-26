import { TOperation } from '../../models/transaction.models';
import { formatAmount, formatDate } from '../../utils';
import styles from './TransactionItem.module.css';

type TTransactionItemProps = {
	transaction: TOperation;
};

function TransactionItem({ transaction }: TTransactionItemProps) {
	const { id, amount, date, type, description } = transaction;
	return (
		<li key={id} className={styles.item}>
			<div className={styles.itemLeft}>
				<span className={`${styles.badge} ${styles[type]}`}>{type === 'credit' ? 'Accredito' : 'Addebito'}</span>
				{description !== undefined && <span className={styles.description}>{description}</span>}
			</div>
			<div className={styles.itemRight}>
				<span className={`${styles.amount} ${type === 'credit' ? styles.amountCredit : styles.amountDebit}`}>
					{type === 'credit' ? '+' : '−'} {formatAmount(amount)}
				</span>
				<span className={styles.date}>{formatDate(date)}</span>
			</div>
		</li>
	);
}

export default TransactionItem;

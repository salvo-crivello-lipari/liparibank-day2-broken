import { TOperation } from '../../models/transaction.models';
import LoadingState from '../LoadingState/LoadingState';
import TransactionItem from '../TransactionItem/TransactionItem';
import styles from './OperationHistory.module.css';

type TOperationHistoryProps = { operations: TOperation[]; loading: boolean };

const OperationHistory = ({ operations, loading }: TOperationHistoryProps) => {
	if (loading) return <LoadingState />;

	return (
		<div className={styles.card}>
			<h3 className={styles.title}>Movimenti Recenti</h3>
			<ul className={styles.list}>
				{operations.map((operation) => (
					<TransactionItem key={operation.id} transaction={operation} />
				))}
			</ul>
		</div>
	);
};

export default OperationHistory;

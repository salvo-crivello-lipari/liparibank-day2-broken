import { useState } from 'react';
import styles from './AccountBalanceCard.module.css';
import { TAccount } from '../../models/account.models';
import { formatCurrency } from '../../utils';

interface AccountBalanceCardProps {
	account: TAccount;
	onViewTransactions: (accountId: string) => void;
	onRefreshBalance: (accountId: string) => Promise<void>;
}

const AccountBalanceCard = ({ account, onViewTransactions, onRefreshBalance }: AccountBalanceCardProps) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleRefresh = async () => {
		if (loading) return;

		setLoading(true);
		setError(null);

		try {
			await onRefreshBalance(account.id);
		} catch {
			setError('Impossibile aggiornare il saldo. Riprova.');
		} finally {
			setLoading(false);
		}
	};

	const handleViewTransactions = () => {
		onViewTransactions(account.id);
	};

	return (
		<article className={styles.card} aria-label={`Conto ${account.name}`} aria-busy={loading}>
			<header className={styles.header}>
				<div className={styles.accountInfo}>
					<h3 className={styles.title}>{account.name}</h3>

					<span className={`${styles.badge} ${account.type === 'PRIVATE' ? styles.private : styles.business}`}>
						{account.type === 'PRIVATE' ? 'Privato' : 'Business'}
					</span>
				</div>

				<span className={styles.accountId}>Conto n. {account.id}</span>
			</header>

			<div className={styles.balanceSection}>
				<span className={styles.balanceLabel}>Saldo disponibile</span>

				<p className={styles.balanceValue} aria-label={`Saldo disponibile: ${formatCurrency(account.balance)}`}>
					{formatCurrency(account.balance)}
				</p>

				<span className={styles.iban}>IBAN: {account.iban}</span>
			</div>

			<div className={styles.actions}>
				<button
					type="button"
					className={styles.refreshButton}
					onClick={handleRefresh}
					disabled={loading}
					aria-label={`Aggiorna il saldo del conto ${account.name}`}
				>
					{loading ? (
						<>
							<span className={styles.spinner} aria-hidden="true" />
							Aggiornamento...
						</>
					) : (
						<>
							<span aria-hidden="true">↻</span>
							Aggiorna saldo
						</>
					)}
				</button>

				<button
					type="button"
					className={styles.transactionsButton}
					onClick={handleViewTransactions}
					aria-label={`Visualizza i movimenti del conto ${account.name}`}
				>
					Visualizza movimenti
					<span aria-hidden="true"> →</span>
				</button>
			</div>

			{error && (
				<p className={styles.error} role="alert">
					{error}
				</p>
			)}
		</article>
	);
};

export default AccountBalanceCard;

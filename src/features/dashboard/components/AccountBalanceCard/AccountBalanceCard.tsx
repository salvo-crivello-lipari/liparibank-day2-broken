import { useState } from 'react';
import { useOperationCounter } from '../../hooks/useOperationCounter';
import styles from './AccountBalanceCard.module.css';

interface AccountBalanceCardProps {
  balance: number;
}

const AccountBalanceCard = ({ balance }: AccountBalanceCardProps) => {
  const [displayBalance, setDisplayBalance] = useState(balance);
  const { count, increment, decrement, reset } = useOperationCounter();

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Conto Corrente</h3>
        <span className={styles.accountNumber}>IT60 X054 2811 1010 0000 0123 456</span>
      </div>

      <div className={styles.balanceSection}>
        <span className={styles.balanceLabel}>Saldo disponibile</span>
        <span className={styles.balanceValue}>{formatCurrency(displayBalance)}</span>
      </div>

      <div className={styles.operations}>
        <div className={styles.pendingRow}>
          <span className={styles.pendingLabel}>Operazioni in sospeso:</span>
          <span className={`${styles.pendingCount} ${count > 0 ? styles.active : ''}`}>
            {count}
          </span>
        </div>
        <div className={styles.buttonRow}>
          <button className={styles.opButton} onClick={increment}>
            + Aggiungi operazione
          </button>
          <button
            className={`${styles.opButton} ${styles.opButtonSecondary}`}
            onClick={decrement}
          >
            − Rimuovi operazione
          </button>
          <button className={styles.resetButton} onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountBalanceCard;

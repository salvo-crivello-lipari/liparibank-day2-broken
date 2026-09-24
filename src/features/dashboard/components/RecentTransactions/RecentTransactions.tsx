import { useState, useEffect } from 'react';
import styles from './RecentTransactions.module.css';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
}

const mockTransactions: Transaction[] = [
  { id: 'tx-001', description: 'Stipendio Novembre', amount: 2400.00, date: '2024-11-30', type: 'credit' },
  { id: 'tx-002', description: 'Affitto Dicembre', amount: -850.00, date: '2024-12-01', type: 'debit' },
  { id: 'tx-003', description: 'Supermercato Conad', amount: -67.40, date: '2024-12-03', type: 'debit' },
  { id: 'tx-004', description: 'Rimborso spese aziendali', amount: 320.00, date: '2024-12-05', type: 'credit' },
  { id: 'tx-005', description: 'Bolletta Enel', amount: -112.80, date: '2024-12-07', type: 'debit' },
];

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
  });

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(Math.abs(amount));

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

export default RecentTransactions;

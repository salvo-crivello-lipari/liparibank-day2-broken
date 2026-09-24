import { useState, useEffect } from 'react';
import AccountBalanceCard from './components/AccountBalanceCard/AccountBalanceCard';
import RecentTransactions from './components/RecentTransactions/RecentTransactions';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const [balance, setBalance] = useState(4250.00);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((prev) => {
        const delta = (Math.random() * 200 - 100);
        return Math.round((prev + delta) * 100) / 100;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.welcome}>
        <h1 className={styles.welcomeTitle}>Dashboard</h1>
        <p className={styles.welcomeSubtitle}>
          Riepilogo della tua situazione finanziaria aggiornata in tempo reale.
        </p>
      </div>

      <div className={styles.grid}>
        <AccountBalanceCard balance={balance} />
        <RecentTransactions />
      </div>
    </div>
  );
};

export default DashboardPage;

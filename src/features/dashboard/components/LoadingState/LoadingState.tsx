import styles from './LoadingState.module.css';

function LoadingState() {
	return (
		<div className={styles.card}>
			<h3 className={styles.title}>Movimenti Recenti</h3>
			<div className={styles.loading}>Caricamento movimenti...</div>
		</div>
	);
}

export default LoadingState;

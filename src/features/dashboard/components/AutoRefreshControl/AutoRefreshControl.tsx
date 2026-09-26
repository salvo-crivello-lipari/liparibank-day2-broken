import styles from './AutoRefreshControl.module.css';

type AutoRefreshControlProps = {
	isRunning: boolean;
	onToggle: () => void;
};

const AutoRefreshControl = ({ isRunning, onToggle }: AutoRefreshControlProps) => {
	return (
		<div className={styles.container}>
			<p className={styles.status} aria-live="polite">
				{isRunning ? 'Aggiornamento automatico attivo' : 'Aggiornamento automatico in pausa'}
			</p>
			<button
				type="button"
				className={styles.button}
				onClick={onToggle}
				aria-label={isRunning ? 'Metti in pausa gli aggiornamenti automatici' : 'Riprendi gli aggiornamenti automatici'}
			>
				{isRunning ? 'Pausa aggiornamento' : 'Riprendi aggiornamento'}
			</button>
		</div>
	);
};

export default AutoRefreshControl;

import { useEffect, useState } from 'react';
import { TOperation } from '../models/transaction.models';
import { mockTransactions } from '../constants/constant';

function useFetchOperation() {
	const [operations, setOperations] = useState<TOperation[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => {
			setOperations(mockTransactions);
			setLoading(false);
		}, 600);

		return () => clearTimeout(timer);
	}, []);

	const addOperation = (type: TOperation['type'], amount: number) => {
		const newOperation: TOperation = {
			id: crypto.randomUUID(),
			type,
			amount,
			date: String(new Date()),
		};

		setOperations((prev) => {
			return [newOperation, ...prev].slice(0, 5);
		});
	};

	return { operations, loading, addOperation };
}

export default useFetchOperation;

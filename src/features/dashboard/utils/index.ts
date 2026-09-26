export const formatDate = (dateStr: string) =>
	new Date(dateStr).toLocaleDateString('it-IT', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	});

export const formatAmount = (amount: number) =>
	new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(Math.abs(amount));

const CURRENCY_LOCALE = 'it-IT';

const currencyFormatter = new Intl.NumberFormat(CURRENCY_LOCALE, {
	style: 'currency',
	currency: 'EUR',
});

const dateFormatter = new Intl.DateTimeFormat(CURRENCY_LOCALE, {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
});

export const formatAmount = (amount: number) => currencyFormatter.format(Math.abs(amount));
export const formatCurrency = (value: number): string => currencyFormatter.format(value);
export const formatDate = (value: Date | string | number): string => dateFormatter.format(new Date(value));

import { Price } from './types';
import { countries } from './consts';

export const formatAmount = (amount: number) => {
	if (Number.isInteger(amount)) {
		return amount;
	}
	return amount.toFixed(1);
};

export const formatCurrency = (currency: string) => {
	const country = countries.find(
		country => country.currencies[0].code == currency
	);
	return country?.currencies[0].symbol;
};

export const formatPrice = (price: Price) => {
	const { amount, currency } = price;
	return `${formatAmount(amount)} ${formatCurrency(currency)}`;
};

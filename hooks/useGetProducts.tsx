import { useSearch } from './useSearch';
import { Direction } from '../types';
import { useProductState } from '../states/ProductState';

export const useGetProducts = () => {
	const { handleSearch, isLoading, error } = useSearch();
	const { state, dispatch: productDispatch } = useProductState();

	const getProducts = async (
		searchValue: string,
		direction?: Direction,
		searchType?: 'image' | 'text'
	) => {
		const products = await handleSearch(
			searchValue,
			direction,
			searchType,
			'products'
		);
		productDispatch({
			type: 'addProducts',
			payload: {
				products,
				side: 'end',
			},
		});
	};

	return {
		getProducts,
		isLoading,
		error,
	};
};

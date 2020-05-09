import { useSearch } from './useSearch';
import { Direction } from '../types';
import { useProductState } from '../states/ProductState';

export const useGetProducts = () => {
	const { handleSearch, isLoading, error } = useSearch();
	const { dispatch: productDispatch } = useProductState();

	const getProducts = async (
		searchValue: string,
		direction?: Direction,
		searchType?: 'image' | 'text'
	) => {
		const products = await handleSearch(searchValue, direction, searchType);
		productDispatch({
			type: 'setProducts',
			payload: {
				products,
			},
		});
	};

	return {
		getProducts,
		isLoading,
		error,
	};
};

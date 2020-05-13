import { useSearch } from './useSearch';
import { Direction } from '../types';
import { useProductState } from '../components/product/ProductState';
import { useSearchState } from '../components/search/SearchState';

export const useGetProducts = () => {
	const { handleSearch, isLoading, error } = useSearch();
	const { dispatch: productDispatch } = useProductState();
	const {
		state: {},
	} = useSearchState();

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

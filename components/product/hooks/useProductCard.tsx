import { useCallback } from 'react';
import { useProductDispatch } from '../ProductState';
import { useSearchDispatch } from '../../search/SearchState';

export const useProductCard = () => {
	const searchDispatch = useSearchDispatch();
	const productDispatch = useProductDispatch();

	const toggleFavorite = useCallback(
		(productId: string, section: string) => {
			productDispatch({
				type: 'toggleFavorite',
				payload: { productId, section },
			});
		},
		[productDispatch]
	);

	const handleLabelClick = useCallback(
		(label: string) => {
			searchDispatch({
				type: 'addLabelToQuery',
				payload: { label },
			});
		},
		[searchDispatch]
	);

	return {
		handleLabelClick,
		toggleFavorite,
	};
};

import { useCallback } from 'react';
import { useProductDispatch } from '../ProductState';
import { useSearchDispatch } from '../../search/SearchState';

export default () => {
	const searchDispatch = useSearchDispatch();
	const productDispatch = useProductDispatch();

	const toggleFavorite = (productId: string, section: string) => {
		productDispatch({
			type: 'toggleFavorite',
			payload: { productId, section },
		});
	};

	const handleLabelClick = (label: string) => {
		searchDispatch({
			type: 'addLabelToQuery',
			payload: { label },
		});
	};

	const memoizedToggleFavorite = useCallback(toggleFavorite, []);
	const memoizedHandleLabelClick = useCallback(handleLabelClick, []);

	return {
		toggleFavorite,
		handleLabelClick,
		// toggleFavorite: memoizedToggleFavorite,
		// handleLabelClick: memoizedHandleLabelClick,
	};
};

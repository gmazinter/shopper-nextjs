import { useSearchState } from '../../../states/SearchState';
import { useProductState } from '../../../states/ProductState';

export default () => {
	const { dispatch: searchDispatch } = useSearchState();
	const { dispatch: productDispatch } = useProductState();

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

	return {
		toggleFavorite,
		handleLabelClick,
	};
};

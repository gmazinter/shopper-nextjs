import { useState } from 'react';
import axios from 'axios';
import { useGetPageData } from './useGetPageData';
import { mapItemToProduct, useSearch } from './useSearch';
import { Result } from '../types';
import _ from 'lodash';
import { useSearchState } from '../states/SearchState';
import { useProductState } from '../states/ProductState';

const extractProductFromResult = (page: Result, imageUri: string) => {
	if (!page.pagemap.product) {
		console.log('something critical missing');
		return;
	}

	let productIndex = 0;
	if (page.pagemap.product.length > 1) {
		let possibleIndex = page.pagemap.product.findIndex(
			(product: any) => product.image === imageUri
		);
		if (possibleIndex !== -1) {
			productIndex = possibleIndex;
		}
	}
	return mapItemToProduct(page, productIndex);
};

export const useGetSimilarImages = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<any | null>(null);
	const { dispatch: productDispatch } = useProductState();
	const {
		getPageData,
		isLoading: loadingSinglePageData,
		error: errorGettingPageData,
	} = useGetPageData();

	const {
		searchProducts,
		isLoading: searchLoading,
		error: searchError,
	} = useSearch();

	const getSimilarImages = async (
		imageUri: string | null,
		productUrl: string
	) => {
		if (!imageUri) {
			setError('no image to work with');
			return;
		}
		try {
			setIsLoading(true);
			const response = await axios.post(`/api/similarimages`, null, {
				params: {
					imageUri: imageUri,
				},
			});

			console.log(response.data.webDetection);

			const {
				fullMatchingImages,
				partialMatchingImages,
				visuallySimilarImages,
			} = response.data.webDetection;

			const similarImages = [
				...fullMatchingImages,
				...partialMatchingImages,
				// ...visuallySimilarImages,
			];

			const products = _.flatten(
				_.filter(
					await Promise.all(
						similarImages.map(async image => {
							return await searchProducts(image.url, undefined);
						})
					),
					result => !!result
				)
			);

			console.log(products);

			productDispatch({ type: 'clearProducts' });
			productDispatch({
				type: 'setProducts',
				payload: { products },
			});

			setIsLoading(false);
		} catch (e) {
			setError(e);
		}
	};

	return {
		getSimilarImages,
		isLoading: isLoading || loadingSinglePageData,
		error: error || errorGettingPageData,
	};
};

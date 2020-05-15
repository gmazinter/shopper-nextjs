import { useState, useCallback } from 'react';
import axios from 'axios';
import { useSearch } from '../../../hooks/useSearch';
import _ from 'lodash';
import { useProductDispatch } from '../ProductState';

export const useGetSimilarImages = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<any | null>(null);
	const productDispatch = useProductDispatch();
	const { handleSearch } = useSearch();

	const memoizedHandleSearch = useCallback(handleSearch, []);

	const getSimilarImages = async (imageUri: string | null) => {
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
			const {
				fullMatchingImages,
				partialMatchingImages,
			} = response.data.webDetection;

			const similarImages = [
				...fullMatchingImages,
				...partialMatchingImages,
			];
			const products = _.flatten(
				_.filter(
					await Promise.all(
						similarImages.map(async image => {
							return await memoizedHandleSearch(
								image.url,
								undefined,
								undefined,
								'similarImagesProducts'
							);
						})
					),
					result => !!result
				)
			);
			productDispatch({
				type: 'addProducts',
				payload: {
					products,
					side: 'start',
				},
			});
		} catch (e) {
			setError(e);
		} finally {
			setIsLoading(false);
		}
	};
	const memoizedGetSimilarImages = useCallback(getSimilarImages, [
		memoizedHandleSearch,
	]);

	return {
		getSimilarImages: memoizedGetSimilarImages,
		isLoading,
		error,
	};
};

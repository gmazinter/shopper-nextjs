import { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { useProductState } from '../states/ProductState';

export const useAnnotateImage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | {}>(null);
	const { dispatch: productDispatch } = useProductState();

	const annotateImage = async (
		productUrl: string,
		imageUri: string | null
	) => {
		if (!imageUri) {
			return;
		}
		try {
			setIsLoading(true);
			const response = await axios.post(`/api/similarimages`, null, {
				params: {
					imageUri: imageUri,
				},
			});

			const labels = [
				...response.data.labelAnnotations,
				...response.data.webDetection.webEntities,
			].map((x: { description: string }) => x.description);
			const payload = {
				productUrl,
				labels,
			};
			productDispatch({
				type: 'setProductLabels',
				payload,
			});
			setIsLoading(false);
		} catch (e) {
			setError(e);
		}
	};

	return {
		annotateImage,
		isLoading,
		error,
	};
};

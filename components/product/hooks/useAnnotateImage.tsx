import { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { useProductDispatch } from '../ProductState';
import { useAppState } from '../../../states/AppState';

export const useAnnotateImage = () => {
	const { dispatch: appDispatch } = useAppState();
	const productDispatch = useProductDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | {}>(null);
	useEffect(() => {
		appDispatch({ type: 'setError', payload: { error } });
	}, [error]);

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
			if (!!response.data.error) {
				throw new Error(
					'There was an error annotating the selected image'
				);
			}
			const labels = [
				...response.data.labelAnnotations,
				...response.data.webDetection.webEntities,
			]
				.filter(x => !!x.description)
				.map((x: { description: string }) => x.description);
			const payload = {
				productUrl,
				labels,
			};
			productDispatch({
				type: 'setProductLabels',
				payload,
			});
		} catch (e) {
			setError(e);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		annotateImage,
		isLoading,
		error,
	};
};

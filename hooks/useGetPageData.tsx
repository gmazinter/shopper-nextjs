import { useState } from 'react';
import axios from 'axios';
import { useSearchState } from '../states/SearchState';

export const useGetPageData = () => {
	const {
		state: { selectedCountries },
	} = useSearchState();
	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState<null | {}>(null);
	const getPageData = async (url: string) => {
		try {
			setIsloading(true);
			const response = await axios.get(`/api/searchsinglepage`, {
				params: {
					pageUrl: url,
					countryCodes: selectedCountries,
				},
			});
			setIsloading(false);
			return response.data.items[0];
		} catch (e) {
			setError(e);
		}
	};

	return {
		getPageData,
		isLoading,
		error,
	};
};

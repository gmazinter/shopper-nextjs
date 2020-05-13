import { useState, useEffect } from 'react';
import axios from 'axios';
import {
	useSearchState,
	useSearchDispatch,
} from '../components/search/SearchState';
import { useProductDispatch } from '../components/product/ProductState';
import { useAppState } from '../states/AppState';
import { Result, Product, Direction } from '../types';
import { useGetPageData } from './useGetPageData';

const pageSize = 10;
const resultsLimit = 100;

export const mapItemToProduct = (
	result: Result,
	section: 'products' | 'similarImagesProducts',
	productIndex: number
): Product => {
	const { title, formattedUrl, pagemap } = result;
	const { offer, product, cse_image } = pagemap;
	const name = product ? product[productIndex].name : null;
	const price = offer
		? {
				amount: parseFloat(offer[productIndex].price),
				currency: offer[productIndex].pricecurrency,
		  }
		: null;
	const infoTags = [
		{
			title: 'availability',
			value:
				offer && offer[productIndex].availability
					? offer[productIndex].availability
							.toLowerCase()
							.includes('instock')
						? 'in stock'
						: 'out of stock'
					: 'unknown',
		},
	];
	const imageUri = cse_image ? cse_image[productIndex].src : null;
	return {
		websiteTitle: title,
		name,
		price,
		url: formattedUrl,
		infoTags,
		imageUri,
		isFavorite: false,
		section,
	};
};

const mapItemsToProducts = (items: Result[], section) =>
	items.map(
		(result: Result): Product => mapItemToProduct(result, section, 0)
	);

export const useSearch = () => {
	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState<null | any>(null);

	useEffect(() => {
		appDispatch({ type: 'setError', payload: { error } });
	}, [error]);

	useEffect(() => {
		productDispatch({
			type: 'setIsLoading',
			payload: { isLoading },
		});
	}, [isLoading]);

	const { selectedCountries, pageStart } = useSearchState();
	const searchDispatch = useSearchDispatch();
	const { dispatch: appDispatch } = useAppState();
	const productDispatch = useProductDispatch();
	const { getPageData } = useGetPageData();

	const handleSearch = async (
		searchValue: string,
		direction?: Direction,
		searchType?: 'image' | 'text',
		section?: 'products' | 'similarImagesProducts'
	) => {
		if (
			(direction === 'NEXT' && pageStart + pageSize >= resultsLimit) ||
			(direction === 'PREVIOUS' && pageStart === 0)
		) {
			return [];
		}

		const countryCodes = selectedCountries
			.map((country: any) => `country${country.alpha2Code}`)
			.join('|');
		const newPageStart =
			direction === undefined
				? 0
				: direction === 'NEXT'
				? pageStart + pageSize
				: pageStart - pageSize;
		searchDispatch({
			type: 'setPageStart',
			payload: { pageStart: newPageStart },
		});
		try {
			setIsloading(true);
			const params = {
				searchValue,
				searchType,
				start: newPageStart,
				countryCodes,
			};
			const response = await axios.get(`/api/search`, {
				params,
			});
			const items =
				searchType === 'image'
					? await convertImageResultsToWebResults(response.data.items)
					: response.data.items;
			return items ? mapItemsToProducts(items, section) : [];
		} catch (e) {
			setError(e);
		} finally {
			setIsloading(false);
		}
	};

	const convertImageResultsToWebResults = async (items: []) => {
		const webPages = items.map(
			(res: { image: { contextLink: string } }) => res.image.contextLink
		);
		return await Promise.all(
			webPages.map(async pageUrl => {
				return await getPageData(pageUrl);
			})
		);
	};

	return {
		handleSearch,
		isLoading,
		error,
	};
};

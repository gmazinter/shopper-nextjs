import { useState } from 'react';
import axios from 'axios';
import { useAppState } from '../AppState';
import { Result, Product, Direction } from '../types';
import { useGetPageData } from './useGetPageData';

const pageSize = 10;
const resultsLimit = 100;

export const mapItemToProduct = (
	result: Result,
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
	};
};

const mapItemsToProducts = (items: Result[]) =>
	items.map((result: Result): Product => mapItemToProduct(result, 0));

export const useSearch = () => {
	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState<null | {}>(null);
	const {
		state: { selectedCountries, pageStart },
		dispatch,
	} = useAppState();

	const {
		getPageData,
		isLoading: loadingSinglePageData,
		error: errorGettingPageData,
	} = useGetPageData();

	const searchProducts = async (
		searchValue: string,
		direction?: Direction,
		searchType?: 'image' | 'text'
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
		dispatch({
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
			// items.filter((item: Result) => item.pagemap.product?.length === 1);
			const products = items ? mapItemsToProducts(items) : [];
			setIsloading(false);
			return products;
		} catch (e) {
			setError(e);
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
		searchProducts,
		isLoading: isLoading || loadingSinglePageData,
		error: error || errorGettingPageData,
	};
};

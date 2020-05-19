import { useState, useEffect } from 'react';
import axios from 'axios';
import {
	useSearchState,
	useSearchDispatch,
} from '../components/search/SearchState';
import { useProductDispatch } from '../components/product/ProductState';
import { useAppState, useAppDispatch } from '../states/AppState';
import { Result, Product, Direction, Availability } from '../types';
import { useGetPageData } from './useGetPageData';

const pageSize = 10;
const resultsLimit = 100;

export const mapItemToProduct = (
	result: Result,
	section: 'products' | 'similarImagesProducts',
	productIndex: number
): Product => {
	const { title, link, pagemap } = result;
	const { offer, product, cse_image } = pagemap;
	const name = product ? product[productIndex].name : null;
	const price = offer
		? {
				amount: parseFloat(offer[productIndex].price),
				currency: offer[productIndex].pricecurrency,
		  }
		: null;

	const availability =
		offer && offer[productIndex].availability
			? offer[productIndex].availability.toLowerCase().includes('instock')
				? 'in stock'
				: 'out of stock'
			: undefined;
	const infoTags = [];
	if (product?.length > 1) {
		infoTags.push('multiple items');
	}
	if (!!availability) {
		infoTags.push(availability);
	}

	const imageUri = cse_image ? cse_image[productIndex].src : null;
	return {
		websiteTitle: title,
		name,
		price,
		url: link,
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
	const appDispatch = useAppDispatch();
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
			let items =
				searchType === 'image'
					? await convertImageResultsToWebResults(response.data.items)
					: response.data.items;
			console.log(items);
			items = items?.filter(item => testLivePage(item.link));
			return items ? mapItemsToProducts(items, section) : [];
		} catch (e) {
			setError(e);
		} finally {
			setIsloading(false);
		}
	};

	const testLivePage = (url: string) => {
		// will implement or delete after some testing to results
		return true;
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

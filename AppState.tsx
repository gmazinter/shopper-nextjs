import React, { useReducer, createContext, useContext } from 'react';
import _ from 'lodash';
import { Product } from './types';

type SearchType = 'image' | 'text';

type AppState = {
	error: any;
	searchValue: string;
	searchType: SearchType;
	pageStart: number;
	products: Product[] | null;
	selectedCountries: string[];
};

const initialAppState: AppState = {
	error: null,
	searchValue: '',
	searchType: 'text',
	pageStart: 0,
	products: null,
	selectedCountries: [],
};

const appState = createContext<{
	state: AppState;
	dispatch: React.Dispatch<any>;
}>({
	state: initialAppState,
	dispatch: () => null,
});

const reducer = (state: AppState, action: { type: string; payload: any }) => {
	switch (action.type) {
		case 'setSearchValue': {
			const searchValue: string = action.payload;
			return {
				...state,
				searchValue,
			};
		}
		case 'setProducts': {
			const oldProducts = !!state.products ? [...state.products] : [];
			const products: Product[] = _.uniqBy(
				[...oldProducts, ...action.payload.products],
				'url'
			);
			return {
				...state,
				products,
			};
		}
		case 'clearProducts': {
			return {
				...state,
				products: null,
			};
		}
		case 'setPageStart': {
			return {
				...state,
				pageStart: action.payload.pageStart as number,
			};
		}
		case 'setSelectedCountries': {
			const selectedCountries: string[] = action.payload;
			return {
				...state,
				selectedCountries,
			};
		}
		case 'toggleFavorite': {
			const { productId } = action.payload;
			const newProducts: Product[] = [...state.products];
			const newProduct: Product = newProducts.find(
				p => p.url === productId
			);
			newProduct.isFavorite = !newProduct.isFavorite;

			return {
				...state,
				products: newProducts,
			};
		}
		case 'setProductLabels': {
			const indexToUpdate = state.products.findIndex(
				p => p.url === action.payload.productUrl
			);
			const newProducts: Product[] = [...state.products];
			newProducts[indexToUpdate].labels = action.payload.labels;
			return {
				...state,
				products: newProducts,
			};
		}
		case 'addLabelToQuery': {
			const newSearchValue: string = `${state.searchValue} ${action.payload.label}`;
			return {
				...state,
				searchValue: newSearchValue,
			};
		}
		case 'toggleSearchType': {
			const newSearchType: SearchType =
				state.searchType === 'text' ? 'image' : 'text';
			return {
				...state,
				searchType: newSearchType,
			};
		}
		case 'setError': {
			return {
				...state,
				error: action.payload.error,
			};
		}
		case 'clearError': {
			return {
				...state,
				error: null,
			};
		}
		default:
			throw new Error();
	}
};

export const AppStateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialAppState);
	return (
		<appState.Provider value={{ state, dispatch }}>
			{children}
		</appState.Provider>
	);
};

export const useAppState = () => useContext(appState);

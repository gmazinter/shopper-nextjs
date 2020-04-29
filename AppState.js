import React, { useReducer, createContext, useContext } from 'react';
import _ from 'lodash';

const initialAppState = {
	searchValue: '',
	searchType: 'text',
	pageStart: 0,
	products: null,
	productsByImage: null,
	selectedCountries: [],
	highlightedImage: null,
	imageAnnotationResults: null,
};

const appState = createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case 'setSearchValue': {
			return {
				...state,
				searchValue: action.payload,
			};
		}
		case 'setLabels': {
			return {
				...state,
				labels: action.payload.labels,
			};
		}
		case 'setProducts': {
			const oldProducts = !!state.products ? [...state.products] : [];
			const products = _.uniqBy(
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
				pageStart: action.payload.pageStart,
			};
		}
		case 'setSelectedCountries': {
			return {
				...state,
				selectedCountries: action.payload,
			};
		}
		case 'toggleFavorite': {
			const { productId } = action.payload;
			const newProducts = [...state.products];
			const newProduct = newProducts.find(p => p.url === productId);
			newProduct.isFavorite = !newProduct.isFavorite;

			return {
				...state,
				products: newProducts,
			};
		}
		case 'toggleLabel': {
			const { productId, labelId } = action.payload;
			const indexToUpdate = state.products.findIndex(
				p => p.url === productId
			);
			const newProducts = [...state.products];
			const newLabels = { ...newProducts[indexToUpdate].labels };
			newLabels[labelId] = !newLabels[labelId];
			newProducts[indexToUpdate].labels = newLabels;
			return {
				...state,
				products: newProducts,
			};
		}
		case 'setProductLabels': {
			const indexToUpdate = state.products.findIndex(
				p => p.url === action.payload.productUrl
			);
			const newProducts = [...state.products];
			newProducts[indexToUpdate].labels = action.payload.labels;
			return {
				...state,
				products: newProducts,
			};
		}
		case 'addLabelToQuery': {
			const newSearchValue = `${state.searchValue} ${action.payload.label}`;
			return {
				...state,
				searchValue: newSearchValue,
			};
		}
		case 'toggleLabelInQuery': {
			const { labelId, labelValue } = action.payload;
			const newLabels = state.labels ? [...state.labels] : [];
			if (!labelValue) {
				newLabels.push(labelId);
			} else {
				newLabels.splice(newLabels.indexOf(labelId), 1);
			}
			return {
				...state,
				labels: newLabels,
			};
		}
		case 'toggleSearchType': {
			const newSearchType =
				state.searchType === 'text' ? 'image' : 'text';
			return {
				...state,
				searchType: newSearchType,
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

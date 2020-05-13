import React, { useReducer, createContext, useContext } from 'react';
import _ from 'lodash';
import { Dispatch } from '../../types';

type SearchType = 'image' | 'text';

type SearchState = {
	error: any;
	loadingProducts: boolean;
	inputValue: string;
	searchValue: string;
	searchType: SearchType;
	pageStart: number;
	selectedCountries: string[];
};

const initialSearchState: SearchState = {
	loadingProducts: false,
	error: null,
	inputValue: '',
	searchValue: '',
	searchType: 'text',
	pageStart: 0,
	selectedCountries: [],
};

const initialSearchDispatch = () => {};

const searchState = createContext<SearchState>(initialSearchState);
const searchDispatch = createContext<Dispatch>(initialSearchDispatch);

const reducer = (
	state: SearchState,
	action: { type: string; payload: any }
) => {
	switch (action.type) {
		case 'setSearchValue': {
			const searchValue: string = action.payload;
			return {
				...state,
				searchValue,
			};
		}
		case 'setInputValue': {
			const inputValue: string = action.payload;
			return {
				...state,
				inputValue,
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
		case 'toggleLoadingProducts': {
			return {
				...state,
				loadingProducts: action.payload.isLoading,
			};
		}
		default:
			throw new Error();
	}
};

export const SearchStateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialSearchState);
	return (
		<searchState.Provider value={state}>
			<searchDispatch.Provider value={dispatch}>
				{children}
			</searchDispatch.Provider>
		</searchState.Provider>
	);
};

export const useSearchState = () => useContext(searchState);
export const useSearchDispatch = () => useContext(searchDispatch);

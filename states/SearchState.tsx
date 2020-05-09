import React, { useReducer, createContext, useContext } from 'react';
import _ from 'lodash';

type SearchType = 'image' | 'text';

type SearchState = {
	error: any;
	loadingProducts: boolean;
	searchValue: string;
	searchType: SearchType;
	pageStart: number;
	selectedCountries: string[];
};

const initialSearchState: SearchState = {
	loadingProducts: false,
	error: null,
	searchValue: '',
	searchType: 'text',
	pageStart: 0,
	selectedCountries: [],
};

const searchState = createContext<{
	state: SearchState;
	dispatch: React.Dispatch<any>;
}>({
	state: initialSearchState,
	dispatch: () => null,
});

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
		<searchState.Provider value={{ state, dispatch }}>
			{children}
		</searchState.Provider>
	);
};

export const useSearchState = () => useContext(searchState);

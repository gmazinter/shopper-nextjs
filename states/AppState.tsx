import React, { useReducer, createContext, useContext } from 'react';
import _ from 'lodash';

type AppState = {
	error: any;
	isLoading: boolean;
};

const initialAppState: AppState = {
	error: null,
	isLoading: false,
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
		case 'setError': {
			const { error } = action.payload;
			return {
				...state,
				error,
			};
		}
		case 'setIsLoading': {
			const { isLoading } = action.payload;
			return {
				...state,
				isLoading,
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

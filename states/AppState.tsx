import React, { useReducer, createContext, useContext } from 'react';
import _ from 'lodash';
import { Dispatch } from '../types';

type AppState = {
	message: string | null;
	error: any;
	isLoading: boolean;
};

const initialAppState: AppState = {
	message: null,
	error: null,
	isLoading: false,
};
const initialAppDispatch: Dispatch = () => {};

const appState = createContext<AppState>(initialAppState);
const appDispatch = createContext<Dispatch>(initialAppDispatch);

const reducer = (state: AppState, action: { type: string; payload: any }) => {
	switch (action.type) {
		case 'setError': {
			const { error } = action.payload;
			return {
				...state,
				error,
			};
		}
		case 'clearError': {
			return {
				...state,
				error: null,
			};
		}
		case 'setMessage': {
			const { message } = action.payload;
			return {
				...state,
				message,
			};
		}
		case 'clearMessage': {
			return {
				...state,
				message: null,
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
		<appState.Provider value={state}>
			<appDispatch.Provider value={dispatch}>
				{children}
			</appDispatch.Provider>
		</appState.Provider>
	);
};

export const useAppState = () => useContext(appState);
export const useAppDispatch = () => useContext(appDispatch);

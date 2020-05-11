import React, { useReducer, createContext, useContext } from 'react';
import _ from 'lodash';
import { Product } from '../types';

type ProductState = {
	products: Product[] | null;
};

const initialProductState = {
	products: null,
};

const productState = createContext<{
	state: ProductState;
	dispatch: React.Dispatch<any>;
}>({
	state: initialProductState,
	dispatch: () => null,
});

const reducer = (
	state: ProductState,
	action: { type: string; payload: any }
) => {
	switch (action.type) {
		case 'setProducts': {
			const { products } = action.payload;
			return {
				...state,
				products,
			};
		}
		case 'addProducts': {
			const { products, side } = action.payload;
			const stateProducts = [...(state.products || [])];
			const newProducts =
				side === 'end'
					? [...stateProducts, ...products]
					: [...products, ...stateProducts];
			return {
				...state,
				products: newProducts,
			};
		}
		case 'clearProducts': {
			return {
				...state,
				products: null,
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

		default:
			throw new Error();
	}
};

export const ProductStateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialProductState);
	return (
		<productState.Provider value={{ state, dispatch }}>
			{children}
		</productState.Provider>
	);
};

export const useProductState = () => useContext(productState);

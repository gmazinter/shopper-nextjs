import React, { useReducer, createContext, useContext } from 'react';
import _ from 'lodash';
import { Product, Dispatch } from '../../types';

type ProductState = {
	products: Product[] | null;
	isLoading: boolean;
};

const initialProductState = {
	products: null,
	isLoading: false,
};
const initialProductDispatch = () => {};

const productState = createContext<ProductState>(initialProductState);
const productDispatch = createContext<Dispatch>(initialProductDispatch);

const reducer = (
	state: ProductState,
	action: { type: string; payload: any }
) => {
	switch (action.type) {
		case 'setIsLoading': {
			const { isLoading } = action.payload;
			return {
				...state,
				isLoading,
			};
		}
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
			const additionalProducts = _.xorBy(
				products,
				_.intersectionBy(stateProducts, products, 'url'),
				'url'
			);
			const newProducts =
				side === 'end'
					? [...stateProducts, ...additionalProducts]
					: [...additionalProducts, ...stateProducts];
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
		<productState.Provider value={state}>
			<productDispatch.Provider value={dispatch}>
				{children}
			</productDispatch.Provider>
		</productState.Provider>
	);
};

export const useProductState = () => useContext(productState);
export const useProductDispatch = () => useContext(productDispatch);

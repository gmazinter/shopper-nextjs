import React, { useEffect, useState, useCallback } from 'react';
import { Waypoint } from 'react-waypoint';
import { Box, Center } from '../../framework/components/primitives';
import { useGetProducts } from '../../hooks/useGetProducts';
import { useProductState } from './ProductState';
import NoResults from './NoResults';
import ProductSection from './ProductSection';
import { CircularProgress, LinearProgress } from '@material-ui/core';
import { useSearchState } from '../search/SearchState';

export default () => {
	const { products, isLoading } = useProductState();
	const { searchValue, searchType } = useSearchState();
	const { getProducts } = useGetProducts();

	const [activeCard, setActiveCard] = useState<string | null>(null);
	const toggleMenu = useCallback(
		(cardId?: string, isCurrentOpen?: boolean) => {
			if (!cardId || isCurrentOpen) {
				setActiveCard(null);
			} else {
				setActiveCard(cardId);
			}
		},
		[]
	);

	const handleClick = () => {
		toggleMenu();
	};

	useEffect(() => {
		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('click', handleClick);
	});

	const searchResults = products?.filter(
		product => product.section === 'products' && !product.isFavorite
	);
	const similarImagesProducts = products?.filter(
		product =>
			product.section === 'similarImagesProducts' && !product.isFavorite
	);
	const favoriteProducts = products?.filter(product => product.isFavorite);

	const showProducts = products && products.length > 0;
	const showNoResults = products && products.length === 0;
	const showLoading = !products && isLoading;

	return (
		<>
			{showProducts && (
				<Box py={{ _: 1, sm: 2 }}>
					{favoriteProducts.length > 0 && (
						<ProductSection
							products={favoriteProducts}
							title={'favorite results'}
							activeCard={activeCard}
							toggleMenu={toggleMenu}
						/>
					)}
					{similarImagesProducts.length > 0 && (
						<ProductSection
							products={similarImagesProducts}
							title={'similar images results'}
							activeCard={activeCard}
							toggleMenu={toggleMenu}
						/>
					)}
					<ProductSection
						products={searchResults}
						showSectionTitle={
							similarImagesProducts.length > 0 ||
							favoriteProducts.length > 0
						}
						title={'search results'}
						activeCard={activeCard}
						toggleMenu={toggleMenu}
					/>
					<Waypoint
						bottomOffset='20px'
						onEnter={async () => {
							await getProducts(searchValue, 'NEXT', searchType);
						}}
					>
						<Box height='20px' position='relative'>
							{isLoading && <LinearProgress />}
						</Box>
					</Waypoint>
				</Box>
			)}
			{showNoResults && <NoResults />}
			{showLoading && (
				<Center>
					<CircularProgress />
				</Center>
			)}
		</>
	);
};

import React, { useEffect, useState, useCallback } from 'react';
import { Waypoint } from 'react-waypoint';
import styled from 'styled-components';
import { masonrySizes } from '../../consts';
import { Box, Centered } from '../../framework/components/primitives';
import { useGetProducts } from '../../hooks/useGetProducts';
import { useProductState } from './ProductState';
import NoResults from './NoResults';
import ProductSection from './ProductSection';
import { CircularProgress, LinearProgress } from '@material-ui/core';
import { useSearchState, useSearchDispatch } from '../search/SearchState';

const { row } = masonrySizes;

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
				<Centered
					position='absolute'
					top={0}
					bottom={0}
					left={0}
					right={0}
				>
					<CircularProgress />
				</Centered>
			)}
		</>
	);
};

export const Masonry = styled(Box).attrs({
	mx: { sm: '-8px' },
	gridTemplateColumns: {
		_: 'repeat(auto-fill, minmax(180px, 1fr))',
		sm: 'repeat(auto-fill, minmax(200px, 1fr))',
		md: 'repeat(auto-fill, minmax(240px, 1fr))',
	},
})`
	display: grid;
	grid-auto-rows: ${row}px;
`;

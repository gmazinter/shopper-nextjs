import React, { useState, useEffect } from 'react';
import { Box, Centered, Text } from '../../framework/components/primitives';
import { useSearchState } from '../../states/SearchState';
import styled from 'styled-components';
import { masonrySizes } from '../../consts';
import { Waypoint } from 'react-waypoint';
import { useGetProducts } from '../../hooks/useGetProducts';
import NoResults from './NoResults';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useProductState } from '../../states/ProductState';
import ProductSection from './ProductSection';

const { row } = masonrySizes;

export default () => {
	const {
		state: { searchType, searchValue, loadingProducts },
		dispatch: searchDispatch,
	} = useSearchState();
	const {
		state: { products },
		dispatch: productDispatch,
	} = useProductState();

	const { getProducts } = useGetProducts();

	const [activatedCard, setActivatedCard] = useState<string | null>(null);
	const toggleMenu = (cardId?: string) => {
		if (!cardId || activatedCard === cardId) {
			setActivatedCard(null);
		} else {
			setActivatedCard(cardId);
		}
	};

	const handleClick = () => {
		toggleMenu();
	};

	useEffect(() => {
		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('click', handleClick);
	});

	const toggleFavorite = (productId: string, section: string) => {
		productDispatch({
			type: 'toggleFavorite',
			payload: { productId, section },
		});
	};

	const handleLabelClick = (label: string) => {
		searchDispatch({
			type: 'addLabelToQuery',
			payload: { label },
		});
	};

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
	const showLoading = !products && loadingProducts;

	return (
		<>
			{showProducts && (
				<Box py={{ _: 1, sm: 2 }}>
					{favoriteProducts.length > 0 && (
						<ProductSection
							products={favoriteProducts}
							title={'marked as favorite'}
							activatedCard={activatedCard}
							handleLabelClick={handleLabelClick}
							toggleMenu={toggleMenu}
							toggleFavorite={toggleFavorite}
						/>
					)}
					{similarImagesProducts.length > 0 && (
						<ProductSection
							products={similarImagesProducts}
							title={'similar images search'}
							activatedCard={activatedCard}
							handleLabelClick={handleLabelClick}
							toggleMenu={toggleMenu}
							toggleFavorite={toggleFavorite}
						/>
					)}
					<ProductSection
						products={searchResults}
						showSectionTitle={
							similarImagesProducts.length > 0 ||
							favoriteProducts.length > 0
						}
						title={'search results'}
						activatedCard={activatedCard}
						handleLabelClick={handleLabelClick}
						toggleMenu={toggleMenu}
						toggleFavorite={toggleFavorite}
					/>
					<Waypoint
						bottomOffset='20px'
						onEnter={async () => {
							await getProducts(searchValue, 'NEXT', searchType);
						}}
					>
						<Box height='20px' position='relative'>
							{loadingProducts && <LinearProgress />}
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

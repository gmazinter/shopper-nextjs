import React, { useState, useEffect } from 'react';
import { Box, Centered, Text } from '../../framework/components/primitives';
import { Container } from '../customMaterialUi';
import ProductCard from './ProductCard';
import { useSearchState } from '../../states/SearchState';
import styled from 'styled-components';
import { masonrySizes } from '../../consts';
import { Product } from '../../types';
import { Waypoint } from 'react-waypoint';
import { useGetProducts } from '../../hooks/useGetProducts';
import NoResults from './NoResults';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useProductState } from '../../states/ProductState';
import ProductSection from './ProductSection';
import Divider from '@material-ui/core/Divider';

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

	return (
		<Container fixed disableGutters>
			{products ? (
				products.length > 0 ? (
					<Box maxWidth={1000} py={{ _: 1, sm: 2 }}>
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
								await getProducts(
									searchValue,
									'NEXT',
									searchType
								);
							}}
						>
							<Box height='20px' position='relative'>
								{loadingProducts && <LinearProgress />}
							</Box>
						</Waypoint>
					</Box>
				) : (
					<NoResults />
				)
			) : (
				loadingProducts && (
					<Centered
						position='absolute'
						top={0}
						bottom={0}
						left={0}
						right={0}
					>
						<CircularProgress />
					</Centered>
				)
			)}
		</Container>
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

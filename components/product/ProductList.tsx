import React, { useState, useEffect } from 'react';
import { Box, Centered } from '../../framework/components/primitives';
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

	const toggleFavorite = (productId: string) => {
		productDispatch({
			type: 'toggleFavorite',
			payload: { productId },
		});
	};

	const handleLabelClick = (label: string) => {
		searchDispatch({
			type: 'addLabelToQuery',
			payload: { label },
		});
	};

	return (
		<Container fixed disableGutters>
			{products ? (
				products.length > 0 ? (
					<Box maxWidth={1000} py={{ _: 1, sm: 2 }}>
						<Masonry>
							{products.map((product: Product) => (
								<ProductCard
									handleLabelClick={handleLabelClick}
									isMenuOpen={product.url === activatedCard}
									toggleMenu={toggleMenu}
									key={product.url}
									product={product}
									toggleFavorite={toggleFavorite}
								/>
							))}
						</Masonry>
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

const Masonry = styled(Box).attrs({
	mx: { sm: '-8px' },
	gridTemplateColumns: {
		_: 'repeat(auto-fill, minmax(180px, 1fr))',
		sm: 'repeat(auto-fill, minmax(240px, 1fr))',
	},
})`
	display: grid;
	grid-auto-rows: ${row}px;
`;

import React, { useState, useEffect } from 'react';
import { Box, Text } from '../../framework/components/primitives';
import { Container } from '../customMaterialUi';
import ProductCard from './ProductCard';
import { useAppState } from '../../AppState';
import styled from 'styled-components';
import { masonrySizes } from '../../consts';
import { Product } from '../../types';
import { Waypoint } from 'react-waypoint';
import { useSearch } from '../../hooks/useSearch';
import CircularProgress from '@material-ui/core/CircularProgress';
import NoResults from './NoResults';

const { row } = masonrySizes;

export default () => {
	const {
		state: { products, searchType, searchValue },
		dispatch,
	} = useAppState();

	const { searchProducts, isLoading, error } = useSearch();
	useEffect(() => {
		dispatch({ type: 'setError', payload: { error } });
	}, [error]);

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
		dispatch({
			type: 'toggleFavorite',
			payload: { productId },
		});
	};

	const handleLabelClick = (label: string) => {
		dispatch({
			type: 'addLabelToQuery',
			payload: { label },
		});
	};

	return (
		<Box id='product-list'>
			<Container fixed disableGutters position='relative' flex={1}>
				{products &&
					(products.length > 0 ? (
						<Box maxWidth={1000} py={{ _: 1, sm: 2 }}>
							<Masonry>
								{products.map((product: Product) => (
									<ProductCard
										handleLabelClick={handleLabelClick}
										isMenuOpen={
											product.url === activatedCard
										}
										toggleMenu={toggleMenu}
										key={product.url}
										product={product}
										toggleFavorite={toggleFavorite}
									/>
								))}
							</Masonry>
							{products && (
								<>
									<Waypoint
										onEnter={async () => {
											await searchProducts(
												searchValue,
												'NEXT',
												searchType
											);
										}}
									/>
									{isLoading && <CircularProgress />}
								</>
							)}
						</Box>
					) : (
						<NoResults />
					))}
			</Container>
		</Box>
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

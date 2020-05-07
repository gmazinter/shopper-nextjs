import React, { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '../customMaterialUi';
import { useResponsive } from '../../framework/hooks/useResponsive';
import { useAppState } from '../../AppState';
import { useSearch } from '../../hooks/useSearch';

export default () => {
	const [isClientSide, setIsClientSide] = useState(false);
	const { useMediaQuery } = useResponsive();

	const { searchProducts, isLoading, error } = useSearch();
	const {
		state: { searchValue, searchType },
		dispatch,
	} = useAppState();

	useEffect(() => {
		setIsClientSide(true);
	}, []);

	const handleNewSearch = async (
		e: React.MouseEvent | React.TouchEvent | React.FormEvent
	) => {
		dispatch({ type: 'clearProducts' });
		const products = await searchProducts(
			searchValue,
			undefined,
			searchType
		);
		dispatch({
			type: 'setProducts',
			payload: {
				products,
			},
		});
	};

	return isClientSide
		? (useMediaQuery({
				_: (
					<Button
						ml='-1px'
						borderTopLeftRadius={0}
						borderTopRightRadius='22px'
						borderBottomRightRadius='22px'
						borderBottomLeftRadius={0}
						border='1px solid grey'
						type='submit'
						onClick={handleNewSearch}
					>
						{isLoading ? 'Loading...' : <SearchIcon />}
					</Button>
				),
				sm: (
					<Button
						borderRadius={2}
						type='submit'
						onClick={handleNewSearch}
						color='primary'
						variant='contained'
					>
						{isLoading ? 'Loading...' : 'Search'}
					</Button>
				),
		  }) as React.ReactElement)
		: null;
};

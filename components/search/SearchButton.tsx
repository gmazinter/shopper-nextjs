import React, { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '../customMaterialUi';
import { useResponsive } from '../../framework/hooks/useResponsive';
import { useSearchState } from '../../states/SearchState';
import { useGetProducts } from '../../hooks/useGetProducts';
import { useProductState } from '../../states/ProductState';
import { useRouter } from 'next/router';

export default () => {
	const [isClientSide, setIsClientSide] = useState(false);
	const { useMediaQuery } = useResponsive();
	const router = useRouter();
	const { getProducts } = useGetProducts();
	const {
		state: { searchValue, searchType },
	} = useSearchState();
	const { dispatch: productDispatch } = useProductState();

	useEffect(() => {
		setIsClientSide(true);
	}, []);

	const handleNewSearch = async (
		e: React.MouseEvent | React.TouchEvent | React.FormEvent
	) => {
		productDispatch({ type: 'clearProducts' });
		router.push('/products', undefined, { shallow: true });
		await getProducts(searchValue, undefined, searchType);
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
						<SearchIcon />
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
						Search
					</Button>
				),
		  }) as React.ReactElement)
		: null;
};

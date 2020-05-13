import React, { useState, useEffect, useRef } from 'react';
import { TextField } from '../customMaterialUi';
import { Box, Text, Flex } from '../../framework/components/primitives';
import styled from 'styled-components';
import { useResponsive } from '../../framework/hooks/useResponsive';
import AdvancedSearch from './AdvancedSearch';
import { useClickOutside } from '../../framework/hooks/useClickOutside';
import SearchButton from './SearchButton';
import LeftJustifiedContainer from '../layout/LeftJustifiedContainer';
import { useSearchState } from './SearchState';
import { useProductState } from '../product/ProductState';
import { useRouter } from 'next/router';
import { useGetProducts } from '../../hooks/useGetProducts';

export default () => {
	const [isClientSide, setIsClientSide] = useState(false);
	const [showAdvanced, setShowAdvanced] = useState(false);
	const { useMediaQuery } = useResponsive();
	const {
		state: { searchValue },
		dispatch,
	} = useSearchState();
	const { dispatch: productDispatch } = useProductState();

	useEffect(() => {
		setIsClientSide(true);
	}, []);
	const router = useRouter();
	const { getProducts } = useGetProducts();

	const advancedSearchRef = useRef<null | HTMLElement>(null);
	const searchInputRef = useRef(null);
	useClickOutside([searchInputRef, advancedSearchRef], () =>
		setShowAdvanced(false)
	);

	let appTitle: React.ReactNode;
	let inputPlaceholder: React.ReactNode;
	if (isClientSide) {
		appTitle = useMediaQuery({
			_: null,
			sm: (
				<Text mr={2} fontSize={7} fontWeight='bold'>
					SHOPPER
				</Text>
			),
		});

		inputPlaceholder = useMediaQuery({
			_: 'Shopper',
			sm: 'Search',
		});
	}

	const handleNewSearch = async e => {
		e.preventDefault();
		e.stopPropagation();
		productDispatch({ type: 'clearProducts' });
		router.push('/products', undefined, { shallow: true });
		await getProducts();
	};

	return (
		<SearchbarContainer>
			<LeftJustifiedContainer>
				<form onSubmit={handleNewSearch}>
					<Flex>
						{appTitle}
						<Box
							position='relative'
							mr={{ sm: 2 }}
							flex={1}
							id='searchbar-input-wrapper'
						>
							<SearchbarInput
								autoComplete='off'
								ref={searchInputRef}
								id='search-input'
								variant='outlined'
								placeholder={inputPlaceholder as string}
								value={searchValue}
								onChange={e =>
									dispatch({
										type: 'setSearchValue',
										payload: e.target.value,
									})
								}
								onFocus={() => {
									setShowAdvanced(true);
								}}
								onClick={event => {
									const target = event.target as HTMLFormElement;
									if (!!target.focus) {
										setShowAdvanced(true);
									}
								}}
							/>
							{showAdvanced && (
								<AdvancedSearch
									closeAdvanced={() => {
										setShowAdvanced(false);
									}}
									ref={advancedSearchRef}
								/>
							)}
						</Box>
						<SearchButton />
					</Flex>
				</form>
			</LeftJustifiedContainer>
		</SearchbarContainer>
	);
};

const SearchbarContainer = styled(Box).attrs({
	p: 2,
	boxShadow: 'small',
	zIndex: 4,
	bg: 'white',
	position: 'relative',
})``;

const SearchbarInput = styled(TextField)`
	position: relative;
	z-index: 2;
	background-color: white;
	height: 100%;
	width: 100%;
	& .MuiInputBase-root {
		border-radius: 22px 0 0 22px;
	}
	& .MuiOutlinedInput-root {
		& fieldset {
			/* border-color: red; */
		}
	}
	${props => props.theme.mediaQueries.small} {
		& .MuiInputBase-root {
			border-radius: 22px;
		}
	}
`;

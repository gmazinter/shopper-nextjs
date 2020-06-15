import React, { useState, useRef } from 'react';
import { Box, Center, Flex } from '../../framework/components/primitives';
import { TextField } from '../customMaterialUi';
import AdvancedSearch from './AdvancedSearch';
import SearchButton from './SearchButton';
import { useClickOutside } from '../../framework/hooks/useClickOutside';
import { useSearchState, useSearchDispatch } from './SearchState';
import { useProductDispatch } from '../product/ProductState';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useGetProducts } from '../../hooks/useGetProducts';

export default () => {
	const [showAdvanced, setShowAdvanced] = useState(false);
	const { searchValue, inputValue } = useSearchState();
	const searchDispatch = useSearchDispatch();

	const advancedSearchRef = useRef<null | HTMLElement>(null);
	const searchInputRef = useRef(null);
	useClickOutside([searchInputRef, advancedSearchRef], () =>
		setShowAdvanced(false)
	);
	const productDispatch = useProductDispatch();
	const router = useRouter();
	const { getProducts } = useGetProducts();

	const handleNewSearch = async e => {
		e.preventDefault();
		e.stopPropagation();
		searchDispatch({ type: 'setSearchValue', payload: inputValue });
		productDispatch({ type: 'clearProducts' });
		router.push('/products', undefined, { shallow: true });
		await getProducts(inputValue);
	};

	return (
		<form onSubmit={handleNewSearch}>
			<Flex>
				<Box
					position='relative'
					// mr={{ sm: 2 }}
					flex={1}
					id='searchbar-input-wrapper'
				>
					<SearchInput
						autoComplete='off'
						ref={searchInputRef}
						variant='outlined'
						placeholder='placeholder'
						value={inputValue}
						onChange={e =>
							searchDispatch({
								type: 'setInputValue',
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
					{/* {showAdvanced && (
					<AdvancedSearch
						closeAdvanced={() => {
							setShowAdvanced(false);
						}}
						ref={advancedSearchRef}
					/>
				)} */}
				</Box>
				<SearchButton />
			</Flex>
		</form>
	);
};

const SearchInput = styled(TextField)`
	background-color: white;
	position: relative;
	z-index: 2;
	height: 100%;
	width: 100%;
	& .MuiOutlinedInput-root {
		& fieldset {
			// border-color: red;
		}
	}
	& .MuiInputBase-root {
		border-radius: 8px 8px 0 8px;
	}
	${props => props.theme.mediaQueries.small} {
		& .MuiInputBase-root {
			border-radius: 22px;
		}
	}
`;

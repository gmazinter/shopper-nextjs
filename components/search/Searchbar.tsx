import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Container, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Chip, Button, TextField } from '../customMaterialUi';
import { Box, Text, Flex } from '../../framework/components/primitives';
import styled from 'styled-components';
import { useAppState } from '../../AppState';
import { useSearch } from '../../hooks/useSearch';
import { useResponsive } from '../../framework/hooks/useResponsive';
import AdvancedSearch from './AdvancedSearch';
import { useClickOutside } from '../../framework/hooks/useClickOutside';

export default () => {
	const [isClientSide, setIsClientSide] = useState(false);
	const [showAdvanced, setShowAdvanced] = useState(false);
	const {
		state: { searchValue, searchType },
		dispatch,
	} = useAppState();
	const { handleSearch, isLoading, error } = useSearch();
	const { renderResponsive } = useResponsive();

	const handleNewSearch = async (
		e: React.MouseEvent | React.TouchEvent | React.FormEvent
	) => {
		dispatch({ type: 'clearProducts' });
		const products = await handleSearch(searchValue, undefined, searchType);
		dispatch({
			type: 'setProducts',
			payload: {
				products,
			},
		});
	};

	useEffect(() => {
		setIsClientSide(true);
	}, []);

	let appTitle: React.ReactNode;
	let inputPlaceholder: React.ReactNode;
	let searchButton: React.ReactNode;

	// let advancedSearch: React.ReactNode;
	// const advancedSearchRef = useRef<null | HTMLElement>(null);
	// const searchInputRef = useRef(null);
	// useClickOutside([searchInputRef, advancedSearchRef], () =>
	// 	setShowAdvanced(false)
	// );

	if (isClientSide) {
		appTitle = renderResponsive({
			_: null,
			sm: (
				<Text mr={2} fontSize={7} fontWeight='bold'>
					SHOPPER
				</Text>
			),
		});

		inputPlaceholder = renderResponsive({
			_: 'Shopper',
			sm: 'Search',
		});

		searchButton = renderResponsive({
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
		});

		// const portalRoot =
		// 	document.querySelector('#advanced-panel-root') || document.body;
		// advancedSearch =
		// 	showAdvanced &&
		// 	renderResponsive({
		// 		_: ReactDOM.createPortal(
		// 			<AdvancedSearch ref={advancedSearchRef} />,
		// 			portalRoot
		// 		),
		// 		sm: <AdvancedSearch ref={advancedSearchRef} />,
		// 	});
	}

	return (
		<SearchbarContainer>
			<Container fixed disableGutters>
				<Box maxWidth={1000}>
					<form
						onSubmit={e => {
							e.preventDefault();
							e.stopPropagation();
						}}
					>
						<Flex>
							{appTitle}
							<Box position='relative' mr={{ sm: 2 }} flex={1}>
								<SearchbarInput
									autoComplete='off'
									// ref={searchInputRef}
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
							</Box>
							{searchButton}
						</Flex>
					</form>
				</Box>
			</Container>
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
			border-radius: 8px;
		}
	}
`;

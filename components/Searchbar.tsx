import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Container, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Chip from './Chip';
import Flex, { Centered } from './primitives/Flex';
import Text from './primitives/Text';
import Box from './primitives/Box';
import Button from './Button';
import TextField from './TextField';
import styled from 'styled-components';
import { useAppState } from '../AppState';
import { useSearch } from '../hooks/useSearch';
import { useResponsive } from '../framework/hooks/useResponsive';
import AdvancedPanel from './AdvancedPanel';
import { useClickOutside } from '../framework/hooks/useClickOutside';

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
					borderTopLeftRadius={0}
					borderTopRightRadius={2}
					borderBottomRightRadius={2}
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
	}

	const advancedPanelRef = useRef<null | HTMLElement>(null);
	const searchInputRef = useRef(null);
	useClickOutside([searchInputRef, advancedPanelRef], () =>
		setShowAdvanced(false)
	);

	// const portalRoot =
	// 	document.querySelector('#advanced-panel-root') || document.body;
	const advancedPanel =
		showAdvanced &&
		renderResponsive({
			_: <AdvancedPanel ref={advancedPanelRef} />,
			// _: ReactDOM.createPortal(
			// 	<AdvancedPanel ref={advancedPanelRef} />,
			// 	portalRoot
			// ),
			// sm: <AdvancedPanel ref={advancedPanelRef} />,
		});

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
								{advancedPanel}
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
		border-radius: 8px 0 0 8px;
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

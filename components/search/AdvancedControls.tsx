import React, { MutableRefObject } from 'react';
import ReactDOM from 'react-dom';
import { Box, Text, Flex, Card } from '../../framework/components/primitives';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextFields from '@material-ui/icons/TextFields';
import Switch from 'react-switch';
import { useAppState } from '../../AppState';
import CountrySelect from './CountrySelect';
import styled from 'styled-components';
import { useResponsive } from '../../framework/hooks/useResponsive';
import Searchbar from './Searchbar';

export default React.forwardRef((props, ref) => {
	const { useMediaQuery } = useResponsive();
	const {
		state: { searchType },
		dispatch,
	} = useAppState();

	// const portalRoot = useMediaQuery({
	// 	_: document.querySelector('#searchbar') || document.body,
	// 	sm: document.querySelector('#search-input') || document.body,
	// }) as HTMLElement;

	return (
		<Box p={4} ref={ref as MutableRefObject<HTMLDivElement>}>
			<Flex maxWidth='200px' mb={4} justifyContent='space-between'>
				<Text>Search Type</Text>
				<Switch
					onChange={() => {
						dispatch({ type: 'toggleSearchType' });
					}}
					checked={searchType === 'image'}
					uncheckedIcon={<TextFields fontSize='small' />}
					checkedIcon={<PhotoCamera fontSize='small' />}
				/>
			</Flex>
			<Box>
				<Text mb={2}>Select Countries to Search</Text>
				<CountrySelect />
			</Box>
		</Box>
	);
});

// const AdvancedSearchContainer = styled(Card).attrs({
// 	boxShadow: 'small',
// 	left: { _: 0, sm: '20px' },
// 	right: { _: 0, sm: '20px' },
// })`
// 	minheight: 200px;
// 	background-color: white;
// 	position: absolute;
// 	top: 100%;
// `;

import React, { forwardRef, MutableRefObject } from 'react';
import { Box, Text, Flex, Card } from '../../framework/components/primitives';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextFields from '@material-ui/icons/TextFields';
import Switch from 'react-switch';
import { useAppState } from '../../AppState';
import CountrySelect from './CountrySelect';
import Searchbar from './Searchbar';
import styled from 'styled-components';
import { useResponsive } from '../../framework/hooks/useResponsive';

export default forwardRef((props, ref) => {
	const { isSmall } = useResponsive();
	const {
		state: { searchType },
		dispatch,
	} = useAppState();
	return (
		<>
			{!isSmall && <Searchbar />}
			<AdvancedSearchContainer
				ref={ref as MutableRefObject<HTMLDivElement>}
			>
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
			</AdvancedSearchContainer>
		</>
	);
});

const AdvancedSearchContainer = styled(Card).attrs({
	bg: 'pink',
	// boxShadow: 'small',
	// borderRadius: 1,
	p: 4,
})``;
// position: absolute;
// left: 8px;
// right: 8px;
// top: 100%;
// minheight: 200px;

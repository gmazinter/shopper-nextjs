import React, { forwardRef, MutableRefObject } from 'react';
import Card from './primitives/Card';
import Flex from './primitives/Flex';
import Text from './primitives/Text';
import Box from './primitives/Box';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextFields from '@material-ui/icons/TextFields';
import Switch from 'react-switch';
import { useAppState } from '../AppState';
import CountrySelect from './CountrySelect';
import styled from 'styled-components';

export default forwardRef((props, ref) => {
	const {
		state: { searchType },
		dispatch,
	} = useAppState();
	return (
		<AdvancedPanelContainer ref={ref as MutableRefObject<HTMLDivElement>}>
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
		</AdvancedPanelContainer>
	);
});

const AdvancedPanelContainer = styled(Card).attrs({
	bg: 'white',
	boxShadow: 'small',
	borderRadius: 1,
	p: 4,
})`
	position: absolute;
	left: 8px;
	right: 8px;
	top: 100%;
	minheight: 200px;
`;

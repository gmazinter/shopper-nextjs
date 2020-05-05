import React, { MutableRefObject } from 'react';
import { Box, Text, Flex, Card } from '../../framework/components/primitives';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextFields from '@material-ui/icons/TextFields';
import Switch from 'react-switch';
import { useAppState } from '../../AppState';
import CountrySelect from './CountrySelect';
import Searchbar from './Searchbar';
import styled from 'styled-components';
import { useResponsive } from '../../framework/hooks/useResponsive';
import ReactDOM from 'react-dom';

export default ({ ref }) => {
	const { useMediaQuery } = useResponsive();
	const portalRoot = useMediaQuery({
		_: document.querySelector('#searchbar-wrapper'),
		sm: document.querySelector('body'),
	});
	return useMediaQuery({
		_: ReactDOM.createPortal(
			<AdvancedSearchContent showSearchbar={true} ref={ref} />,
			portalRoot as Element
		),
		sm: (
			<AdvancedSearchContainer>
				<AdvancedSearchContent ref={ref} />
			</AdvancedSearchContainer>
		),
	}) as React.ReactElement;
};

type AdvancedSearchContentProps = {
	ref: MutableRefObject<HTMLDivElement>;
	showSearchbar?: boolean;
};

const AdvancedSearchContent = ({
	ref,
	showSearchbar,
}: AdvancedSearchContentProps) => {
	const {
		state: { searchType },
		dispatch,
	} = useAppState();
	return (
		<>
			{showSearchbar && <Searchbar />}
			<Card p={4} ref={ref as MutableRefObject<HTMLDivElement>}>
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
			</Card>
		</>
	);
};

const AdvancedSearchContainer = styled(Card).attrs({
	boxShadow: 'small',
	// borderRadius: 1,
	// zIndex: 'important',
})`
	background-color: white;
	position: absolute;
	left: 20px;
	right: 20px;
	top: 100%;
	minheight: 200px;
`;

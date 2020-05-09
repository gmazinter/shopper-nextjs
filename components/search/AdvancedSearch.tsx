import React, { MutableRefObject } from 'react';
import { Box, Text, Flex, Card } from '../../framework/components/primitives';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextFields from '@material-ui/icons/TextFields';
import Switch from 'react-switch';
import { useSearchState } from '../../states/SearchState';
import CountrySelect from './CountrySelect';
import Searchbar from './Searchbar';
import styled from 'styled-components';
import { useResponsive } from '../../framework/hooks/useResponsive';
import ReactDOM from 'react-dom';
import _ from 'lodash';

// export default ({ ref }) => {
// 	const { useMediaQuery } = useResponsive();
// 	const portalRoot = useMediaQuery({
// 		_: document.querySelector('#searchbar-wrapper'),
// 		sm: document.querySelector('body'),
// 	});
// 	return useMediaQuery({
// 		_: ReactDOM.createPortal(
// 			<AdvancedSearchContent showSearchbar={true} ref={ref} />,
// 			portalRoot as Element
// 		),
// 		sm: (
// 			<AdvancedSearchContainer>
// 				<AdvancedSearchContent ref={ref} />
// 			</AdvancedSearchContainer>
// 		),
// 	}) as React.ReactElement;
// };

type AdvancedSearchProps = {
	closeAdvanced: () => void;
};

export default React.forwardRef((props: AdvancedSearchProps, ref) => {
	const { closeAdvanced } = props;
	const { useMediaQuery } = useResponsive();
	const portalRoot = useMediaQuery({
		_: document.querySelector('#layout'),
		sm: document.querySelector('#searchbar-input-wrapper'),
	}) as Element;

	const {
		state: { searchType },
		dispatch,
	} = useSearchState();

	const debouncedCloseAdvanced = _.debounce(closeAdvanced, 100);

	return (
		<>
			{ReactDOM.createPortal(
				<AdvancedSearchContainer
					onTouchMoveCapture={debouncedCloseAdvanced}
					ref={ref as MutableRefObject<HTMLDivElement>}
				>
					<Flex
						maxWidth='200px'
						mb={4}
						justifyContent='space-between'
					>
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
				</AdvancedSearchContainer>,
				portalRoot
			)}
			{ReactDOM.createPortal(
				<AdvancedSearchOverlay />,
				document.querySelector('#product-list')
			)}
		</>
	);
});

const AdvancedSearchOverlay = styled(Box)`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #80808080;
`;

const AdvancedSearchContainer = styled(Card).attrs({
	p: 4,
	pt: { _: 6, sm: 4 },
	boxShadow: 'small',
	borderBottomLeftRadius: 1,
	borderBottomRightRadius: 1,
	position: { _: 'fixed', sm: 'absolute' },
	top: { _: 0, sm: '100%' },
	left: { _: 0, sm: '20px' },
	right: { _: 0, sm: '20px' },
	bottom: { _: 0, sm: 'initial' },
})`
	background-color: white;
	minheight: 200px;
`;

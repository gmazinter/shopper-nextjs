import React, { MutableRefObject, useEffect, ReactElement } from 'react';
import { Box, Text, Flex, Card } from '../../framework/components/primitives';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextFields from '@material-ui/icons/TextFields';
import Switch from 'react-switch';
import { useSearchState, useSearchDispatch } from './SearchState';
import CountrySelect from './CountrySelect';
import styled from 'styled-components';
import { useResponsive } from '../../framework/hooks/useResponsive';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { ModalProps } from '../modals/Modal';
import FullScreenModal from '../modals/FullScreenModal';
import Searchbar from './Searchbar';

type AdvancedSearchProps = {
	closeAdvanced: () => void;
};

export default React.forwardRef((props: AdvancedSearchProps, ref) => {
	const { closeAdvanced } = props;
	const { useMediaQuery } = useResponsive();
	const portalRoot = document.querySelector('#searchbar-input-wrapper');

	const handleKeypress = (e: KeyboardEvent) => {
		if (e.keyCode === 27) {
			closeAdvanced();
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeypress);
		return () => window.removeEventListener('keydown', handleKeypress);
	});

	// const debouncedCloseAdvanced = _.debounce(closeAdvanced, 100);

	return useMediaQuery({
		_: <AdvancedSearchModal ref={ref} closeModal={closeAdvanced} />,
		sm: (
			<>
				<AdvancedSearchDrawer
					ref={ref as MutableRefObject<HTMLDivElement>}
				>
					<AdvancedSearchContent />
				</AdvancedSearchDrawer>
				{ReactDOM.createPortal(
					<AdvancedSearchOverlay />,
					document.querySelector('#page-content-wrapper')
				)}
			</>
		),
	}) as ReactElement;
});

const AdvancedSearchOverlay = styled(Box)`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #80808080;
`;

const AdvancedSearchDrawer = styled(Card).attrs({
	// pt: 4,
	boxShadow: 'small',
	borderBottomLeftRadius: 1,
	borderBottomRightRadius: 1,
	position: 'absolute',
	top: '100%',
	left: '20px',
	right: '20px',
	bottom: 'initial',
})`
	background-color: white;
	minheight: 200px;
`;

const StyledSwitch = styled(Switch)`
	.react-switch-bg > div {
		display: flex;
		justify-content: center;
		align-items: center;
		svg {
			height: 20px;
			width: 20px;
		}
	}
`;

const AdvancedSearchContent = () => {
	const { searchType } = useSearchState();
	const dispatch = useSearchDispatch();
	return (
		<Box p={4} pt={{ _: 6, sm: 4 }}>
			<Flex maxWidth='200px' mb={4} justifyContent='space-between'>
				<Text>Search Type</Text>
				<StyledSwitch
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
};

const AdvancedSearchModal = React.forwardRef(
	({ closeModal }: Partial<ModalProps>, ref) => {
		return (
			<FullScreenModal ref={ref} isOpen={true} closeModal={closeModal}>
				<AdvancedSearchContent />
			</FullScreenModal>
		);
	}
);

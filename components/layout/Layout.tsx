import React from 'react';
import { Box, Flex } from '../../framework/components/primitives';
import Searchbar from '../search/Searchbar';
import ErrorModal from '../ErrorModal';
import { useAppState } from '../../states/AppState';
import LeftJustifiedContainer from './LeftJustifiedContainer';

export default ({ children }) => {
	const {
		state: { error, isLoading },
		dispatch,
	} = useAppState();
	return (
		<Flex
			flexDirection='column'
			id='layout'
			position='relative'
			minHeight='100vh'
		>
			<ErrorModal
				isOpen={!!error}
				message={error?.message}
				closeModal={() => {
					dispatch({ type: 'clearError' });
				}}
			/>
			<Box top={0} position='sticky' zIndex={4} id='searchbar-wrapper'>
				<Searchbar />
			</Box>
			<Box id='page-content-wrapper' flex={1} position='relative'>
				<LeftJustifiedContainer>{children}</LeftJustifiedContainer>
			</Box>
		</Flex>
	);
};

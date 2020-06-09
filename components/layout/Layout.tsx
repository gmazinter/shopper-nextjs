import React from 'react';
import { Box, Flex } from '../../framework/components/primitives';
import Searchbar from '../search/Searchbar';
import ErrorModal from '../modals/ErrorModal';
import MessageModal from '../modals/MessageModal';
import { useAppState, useAppDispatch } from '../../states/AppState';
import LeftJustifiedContainer from './LeftJustifiedContainer';

export default ({ children }) => {
	const { message, error, isLoading } = useAppState();
	const dispatch = useAppDispatch();
	return (
		<Flex
			flexDirection='column'
			id='layout'
			position='relative'
			minHeight='100vh'
		>
			<MessageModal
				isOpen={!!message}
				message={message}
				closeModal={() => {
					dispatch({ type: 'clearMessage' });
				}}
			/>
			<ErrorModal
				isOpen={!!error}
				message={error?.message}
				closeModal={() => {
					dispatch({ type: 'clearError' });
				}}
			/>
			<Box top={0} position='sticky' id='searchbar-wrapper' zIndex={8}>
				<Searchbar />
			</Box>
			<Box id='page-content-wrapper' flex={1} position='relative'>
				<LeftJustifiedContainer>{children}</LeftJustifiedContainer>
			</Box>
		</Flex>
	);
};

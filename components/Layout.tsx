import React from 'react';
import { Box, Flex } from '../framework/components/primitives';
import Searchbar from './search/Searchbar';
import ErrorModal from '../components/ErrorModal';
import { useAppState } from '../AppState';
import { stringify } from 'querystring';

export default ({ children }) => {
	const {
		state: { error },
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
				closeModal={() => {
					dispatch({ type: 'clearError' });
				}}
			/>
			<Box top={0} position='sticky' zIndex={4} id='searchbar-wrapper'>
				<Searchbar />
			</Box>
			{children}
		</Flex>
	);
};

import React from 'react';
import { Box, Flex } from '../framework/components/primitives';
import Searchbar from './search/Searchbar';

export default ({ children }) => (
	<Flex
		flexDirection='column'
		id='layout'
		position='relative'
		minHeight='100vh'
	>
		<Box top={0} position='sticky' zIndex={4} id='searchbar-wrapper'>
			<Searchbar />
		</Box>
		{children}
	</Flex>
);

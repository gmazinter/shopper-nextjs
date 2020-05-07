import React from 'react';
import { Box } from '../framework/components/primitives';
import Searchbar from './search/Searchbar';

export default ({ children }) => (
	<Box id='layout' position='relative'>
		<Box top={0} position='sticky' zIndex={4} id='searchbar-wrapper'>
			<Searchbar />
		</Box>
		{children}
	</Box>
);

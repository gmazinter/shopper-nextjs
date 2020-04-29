import React from 'react';
import Box from './primitives/Box';
import Searchbar from './Searchbar';

export default ({ children }) => (
	<Box>
		<Box top={0} position='sticky' zIndex={4} id='advanced-panel-root'>
			<Searchbar />
		</Box>
		{children}
	</Box>
);

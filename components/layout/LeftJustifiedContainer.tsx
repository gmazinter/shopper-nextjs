import React from 'react';
import { Container } from '../customMaterialUi';
import { Box } from '../../framework/components/primitives';

const LeftJustifiedContainer: React.FC = ({ children }) => {
	return (
		<Container fixed disableGutters>
			<Box maxWidth={1000}>{children}</Box>
		</Container>
	);
};

export default LeftJustifiedContainer;

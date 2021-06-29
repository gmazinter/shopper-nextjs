import React from 'react';
import { Centered } from '../../framework/components/primitives/Flex';
import { Text } from '../../framework/components/primitives';

const NoResults = () => {
	return (
		<Centered position='absolute' top={0} bottom={0} left={0} right={0}>
			<Text>Sorry, we couldn't find any results </Text>
		</Centered>
	);
};

export default NoResults;

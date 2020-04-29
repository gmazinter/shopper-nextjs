import React from 'react';
import Box from './primitives/Box';
import Text from './primitives/Text';
import Flex from './primitives/Flex';
import Card from './primitives/Card';

type InfoTagProps = {
	title: string;
	value: string;
};

export default ({ title, value }: InfoTagProps) => {
	return (
		<Card borderRadius={1} overflow='hidden'>
			<Flex>
				<Text color='white' fontSize={2} p={1} bg='grey'>
					{title}
				</Text>
				<Text color='white' fontSize={2} p={1} bg='lightBlue'>
					{value}
				</Text>
			</Flex>
		</Card>
	);
};

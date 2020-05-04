import React from 'react';
import Box from './primitives/Box';
import Text from './primitives/Text';
import Flex from './primitives/Flex';
import Card from './primitives/Card';
import styled from 'styled-components';

type InfoTagProps = {
	title: string;
	value: string;
};

export default ({ title, value }: InfoTagProps) => {
	return (
		<Card borderRadius={1} overflow='hidden'>
			<Flex>
				<InfoTagText bg='grey'>{title}</InfoTagText>
				<InfoTagText bg='lightBlue'>{value}</InfoTagText>
			</Flex>
		</Card>
	);
};

const InfoTagText = styled(Text).attrs({
	color: 'white',
	fontSize: { _: 1, sm: 2 },
	p: 1,
})``;

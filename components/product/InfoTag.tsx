import React from 'react';
import { Card, Text, Flex } from '../../framework/components/primitives';
import styled from 'styled-components';
import { SpaceProps, space } from 'styled-system';

type InfoTagProps = {
	className?: string;
	title: string;
	value: string;
};

const InfoTagProps = ({ title, value, className }: InfoTagProps) => {
	return (
		<Card borderRadius={1} overflow='hidden' className={className}>
			<Flex>
				<InfoTagText bg='grey'>{title}</InfoTagText>
				<InfoTagText bg='lightBlue'>{value}</InfoTagText>
			</Flex>
		</Card>
	);
};

export default styled(InfoTagProps)<SpaceProps>`
	${space}
`;

const InfoTagText = styled(Text).attrs({
	color: 'white',
	fontSize: { _: 1, sm: 2 },
	p: 1,
})``;

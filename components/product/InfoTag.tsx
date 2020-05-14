import React from 'react';
import { Card, Text, Flex } from '../../framework/components/primitives';
import styled from 'styled-components';
import { SpaceProps, space } from 'styled-system';

const InfoTag = ({ tag, className }: { tag: string; className?: string }) => (
	<Card borderRadius='2px' overflow='hidden' className={className}>
		<InfoTagText>{tag}</InfoTagText>
	</Card>
);

export default styled(InfoTag)<SpaceProps>`
	${space}
`;

const InfoTagText = styled(Text).attrs({
	mt: '3px',
	mr: 1,
	bg: '#b4bbe4',
	color: 'white',
	fontSize: { _: 1, sm: 2 },
	p: { _: '2px', md: '3px' },
})``;

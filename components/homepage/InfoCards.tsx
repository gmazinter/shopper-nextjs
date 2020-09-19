import React from 'react';
import {
	Card,
	Title,
	Text,
	Flex,
	Box,
	Image,
} from '../../framework/components/primitives';
import FixedRatioImage from '../../framework/components/FixedRatioImage';
import styled from 'styled-components';

type InfoBullet = {
	icon: string;
	title: string;
	text: string;
};

export default ({ bullets }: { bullets: Array<InfoBullet> }) => {
	return (
		<Flex
			flexDirection={{ _: 'column', md: 'row' }}
			justifyContent={{ md: 'space-between' }}
			mx={{ md: -3 }}
		>
			{bullets.map(({ title, text, icon }) => (
				<InfoCard title={title} text={text} icon={icon} />
			))}
		</Flex>
	);
};

const InfoCard = ({ title, text, icon }) => {
	return (
		<InfoCardContainer>
			<Flex>
				{/* <Box width={'200px'}> */}
				<FixedRatioImage src={icon} flex='0 0 60px' mr={2} />
				{/* </Box> */}
				<Box>
					<Title>{title}</Title>
					<Text>{text}</Text>
				</Box>
			</Flex>
		</InfoCardContainer>
	);
};

const InfoCardContainer = styled(Card).attrs({
	flex: { md: 1 },
	p: 2,
	mb: { _: 2, md: 'initial' },
	mx: { md: 3 },
	backgroundColor: 'white',
	borderRadius: { _: 3, md: 2 },
	borderTopLeftRadius: { _: 0 },
})``;

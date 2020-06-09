import React from 'react';
import { Card, Text, Box, Image } from '../framework/components/primitives';
import styled from 'styled-components';

export default ({ backgroundImage }: { backgroundImage: string }) => {
	return (
		<Card
			my={{ _: 3, sm: 4 }}
			p={{ _: 4, sm: 5 }}
			px={{ _: 3, sm: 5 }}
			bg='#c7cceb'
			boxShadow='small'
			borderRadius={{ _: 3, sm: 4 }}
		>
			<Text
				mb={{ _: 3, sm: 4 }}
				fontSize={{ _: 4, sm: 5 }}
				fontWeight={500}
			>
				<InlineLogo>SHOPPER</InlineLogo> helps you find the product you
				almost gave up buying online.
			</Text>
			<DescriptionItem>
				<SubHeader>Get rid of all the internet noise</SubHeader>
				<DescriptionText>
					We filter out results which don't offer a product for sale.
				</DescriptionText>
			</DescriptionItem>
			<DescriptionItem>
				<SubHeader>Seriously, it's the world-wide-web</SubHeader>
				<DescriptionText>
					We provide you a simple way to override automatic location
					restrictions and get results from countries you never did
					before.
				</DescriptionText>
			</DescriptionItem>
			<DescriptionItem mb={{ _: 4, sm: 5 }}>
				<SubHeader>Even if you're not a web wiz</SubHeader>
				<DescriptionText>
					You get a simple flow to make an advanced search - suggested
					keywords, image search and more.
				</DescriptionText>
			</DescriptionItem>
			<DescriptionText>
				SHOPPER is powered by Google Custom-Search-Engine.
			</DescriptionText>
			<Image src={backgroundImage} />
		</Card>
	);
};

const InlineLogo = styled(Text).attrs({
	fontSize: { _: 6, sm: 5 },
})`
	font-weight: bold;
	display: inline;
`;

const DescriptionItem = styled(Box).attrs(props => ({
	mb: { _: 3, sm: 4 },
}))``;

const SubHeader = styled(Text).attrs({
	fontSize: { _: 3, sm: 4 },
})`
	text-transform: uppercase;
	font-weight: 500;
`;

const DescriptionText = styled(Text).attrs({
	fontSize: { _: 3, sm: 4 },
})``;

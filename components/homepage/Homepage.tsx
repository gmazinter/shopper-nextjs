import React from 'react';
import { Card, Text, Box, Image } from '../../framework/components/primitives';
import styled from 'styled-components';
import { useResponsive } from '../../framework/hooks/useResponsive';
import SearchControl from '../search/SearchControl';
import InfoCards from './InfoCards';

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

const homepageBullets = [
	{
		icon: '/images/meditation-icon.svg',
		title: 'Get rid of all the internet noise',
		text: "We filter out results which don't offer a product for sale",
	},
	{
		icon: '/images/global-icon.svg',

		title: "Seriously, it's the world-wide-web",
		text:
			'We provide you a simple way to override automatic location restrictions and get results from countries you never did before.',
	},

	{
		icon: '/images/detective-icon.svg',
		title: "Even if you're not a web wiz",
		text:
			'You get a simple flow to make an advanced search - suggested keywords, image search and more.',
	},
];

export default ({ backgroundImage }: { backgroundImage: string }) => {
	// const { useMediaQuery } = useResponsive();
	// const cropString = useMediaQuery({
	// 	_: '&w=400&h=800',
	// 	sm: '&w=760&h=1024',
	// 	md: '&w=1024&h=940',
	// 	lg: '&w=1280&h=960',
	// }) as string;
	return (
		<HomepageContent
			backgroundImage={backgroundImage}
			// cropString={cropString}
		>
			<Card
				backgroundColor='white'
				borderRadius={3}
				borderBottomLeftRadius={0}
				p={2}
				mb={3}
			>
				<Text
					mb={{ _: 3, sm: 4 }}
					fontSize={{ _: 4, sm: 5 }}
					fontWeight={500}
				>
					<InlineLogo>SHOPPER</InlineLogo> helps you find the product
					you almost gave up buying online.
				</Text>
			</Card>
			<Box mb={4}>
				<SearchControl />
			</Box>
			<InfoCards bullets={homepageBullets} />
		</HomepageContent>
		// <Card
		// 	my={{ _: 3, sm: 4 }}
		// 	p={{ _: 4, sm: 5 }}
		// 	px={{ _: 3, sm: 5 }}
		// 	bg='#c7cceb'
		// 	boxShadow='small'
		// 	borderRadius={{ _: 3, sm: 4 }}
		// >
		// 	<Text
		// 		mb={{ _: 3, sm: 4 }}
		// 		fontSize={{ _: 4, sm: 5 }}
		// 		fontWeight={500}
		// 	>
		// 		<InlineLogo>SHOPPER</InlineLogo> helps you find the product you
		// 		almost gave up buying online.
		// 	</Text>
		// 	<DescriptionItem>
		// 		<SubHeader>Get rid of all the internet noise</SubHeader>
		// 		<DescriptionText>
		// 			We filter out results which don't offer a product for sale.
		// 		</DescriptionText>
		// 	</DescriptionItem>
		// 	<DescriptionItem>
		// 		<SubHeader>Seriously, it's the world-wide-web</SubHeader>
		// 		<DescriptionText>
		// 			We provide you a simple way to override automatic location
		// 			restrictions and get results from countries you never did
		// 			before.
		// 		</DescriptionText>
		// 	</DescriptionItem>
		// 	<DescriptionItem mb={{ _: 4, sm: 5 }}>
		// 		<SubHeader>Even if you're not a web wiz</SubHeader>
		// 		<DescriptionText>
		// 			You get a simple flow to make an advanced search - suggested
		// 			keywords, image search and more.
		// 		</DescriptionText>
		// 	</DescriptionItem>
		// 	<DescriptionText>
		// 		SHOPPER is powered by Google Custom-Search-Engine.
		// 	</DescriptionText>
		// 	<Image src={backgroundImage} />
		// </Card>
	);
};

const HomepageContent = styled(Box).attrs({
	pt: 5,
	px: 2,
})<{
	backgroundImage: string;
	// cropString: string;
}>`
	box-sizing: border-box;
	height: 900px;
	background-color: pink;
	width: 100%;
	background-position: center;
	background-size: cover;
	background-image: url(${props =>
		props.backgroundImage}&w=400&h=800&fit=crop&crop=edges);
	background-repeat: no-repeat;
`;
// background-attachment: fixed;

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

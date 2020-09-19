import React from 'react';
import { Card, Text, Box, Flex } from '../../framework/components/primitives';
import styled from 'styled-components';
import { useResponsive } from '../../framework/hooks/useResponsive';
import SearchControl from '../search/SearchControl';
import InfoCards from './InfoCards';
import LeftJustifiedContainer from '../layout/LeftJustifiedContainer';

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
	const { useMediaQuery } = useResponsive();
	const cropString = useMediaQuery({
		_: '&w=400&h=800',
		sm: '&w=760&h=1024',
	}) as string;
	return (
		<LeftJustifiedContainer>
			<HomepageContent>
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
						<InlineLogo>SHOPPER</InlineLogo> helps you find the
						product you almost gave up buying online.
					</Text>
				</Card>
				<Box mb={4}>
					<SearchControl />
				</Box>
				<InfoCards bullets={homepageBullets} />
			</HomepageContent>
			<HomepageImage
				backgroundImage={backgroundImage}
				cropString={cropString}
			/>
		</LeftJustifiedContainer>
	);
};

const HomepageImage = styled(Box).attrs({
	zIndex: 'background',
	position: { _: 'absolute' },
	top: { _: 0 },
	bottom: { _: 0 },
	left: { _: 0, md: 'unset' },
	right: { _: 0 },
	width: { md: 600 },
})<{
	backgroundImage: string;
	cropString: string;
}>`
	background-position: center;
	background-size: cover;
	background-image: url(${props => props.backgroundImage}${props => props.cropString}&fit=crop&crop=edges);
	background-repeat: no-repeat;
`;

const HomepageContent = styled(Card).attrs({
	pt: { _: 5, md: 'initial' },
	px: { _: 2, md: 'initial' },
	p: { md: 5 },
	borderRadius: { md: 2 },
	boxShadow: { md: 'small' },
	zIndex: 'content',
	height: { _: 900, md: 'unset' },
	width: { _: '100%', md: 'initial' },
	backgroundColor: { md: '#f0f4f7' },
})`
	position: relative;
	box-sizing: border-box;
`;

const InlineLogo = styled(Text).attrs({
	fontSize: { _: 6, sm: 5 },
})`
	font-weight: bold;
	display: inline;
`;

// const DescriptionItem = styled(Box).attrs(props => ({
// 	mb: { _: 3, sm: 4 },
// }))``;

// const SubHeader = styled(Text).attrs({
// 	fontSize: { _: 3, sm: 4 },
// })`
// 	text-transform: uppercase;
// 	font-weight: 500;
// `;

// const DescriptionText = styled(Text).attrs({
// 	fontSize: { _: 3, sm: 4 },
// })``;

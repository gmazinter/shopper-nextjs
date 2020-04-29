import React from 'react';
import { Hflex } from './primitives/Flex';
import Card from './primitives/Card';
import FixedRatioImage from './FixedRatioImage';
import NavigateBeforeTwoToneIcon from '@material-ui/icons/NavigateBeforeTwoTone';
import NavigateNextTwoToneIcon from '@material-ui/icons/NavigateNextTwoTone';
import {
	CarouselProvider,
	Slider,
	Slide,
	ButtonBack,
	ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import styled from 'styled-components';
import { useAppState } from '../AppState';
import { Result } from '../types';
import IconButton from '@material-ui/core/IconButton';

type Image = {
	imageUri: string;
	resultId: string;
};

export default () => {
	const {
		state: { results, highlightedImage },
		dispatch,
	} = useAppState();
	const images: Image[] = results.items.map((res: Result) => ({
		imageUri:
			(res.pagemap?.cse_image && res.pagemap?.cse_image[0].src) || '',
		resultId: res.formattedUrl,
	}));

	return (
		<StyledCarouselProvider
			isIntrinsicHeight={true}
			infinite
			naturalSlideWidth={120}
			naturalSlideHeight={120}
			totalSlides={images.length}
			visibleSlides={5}
		>
			<Hflex height={200}>
				<StrippedButtonBack>
					<IconButton>
						<NavigateBeforeTwoToneIcon />
					</IconButton>
				</StrippedButtonBack>
				<Slider>
					{images.map((image, i) => {
						const isHighlighted =
							highlightedImage?.resultId === image.resultId;
						return (
							<Slide index={i} key={image.resultId}>
								<CarouselCard
									isHighlighted={isHighlighted}
									onClick={() =>
										dispatch({
											type: 'setHighlightedImage',
											payload: image,
										})
									}
								>
									<FixedRatioImage
										width={1}
										src={image.imageUri}
										alt=''
									/>
								</CarouselCard>
							</Slide>
						);
					})}
				</Slider>
				<StrippedButtonNext>
					<IconButton>
						<NavigateNextTwoToneIcon />
					</IconButton>
				</StrippedButtonNext>
			</Hflex>
		</StyledCarouselProvider>
	);
};

const CarouselCard = styled(Card).attrs<{ isHighlighted: boolean }>(props => ({
	width: 120,
	overflow: 'hidden',
	my: 3,
	boxShadow: props.isHighlighted ? 'smallSharp' : undefined,
	border: props.isHighlighted ? '1px solid #3f51b5' : undefined,
}))<{ isHighlighted: boolean }>``;

const StyledCarouselProvider = styled(CarouselProvider).attrs({
	bg: 'red',
})``;

const StrippedButtonBack = styled(ButtonBack)`
	all: unset;
`;

const StrippedButtonNext = styled(ButtonNext)`
	all: unset;
`;

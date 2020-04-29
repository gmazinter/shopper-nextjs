import React, { useRef, useEffect, useState, memo } from 'react';
import Card from './primitives/Card';
import Box from './primitives/Box';
import Flex from './primitives/Flex';
import Chip from './Chip';
import InfoTag from './InfoTag';
import styled from 'styled-components';
import { Product } from '../types';
import Image from './primitives/Image';
import imagesLoaded from 'imagesloaded';
import { masonrySizes } from '../consts';
import _ from 'lodash';
import CardMenu from './CardMenu';
import { useAnnotateImage } from '../hooks/useAnnotateImage';
import { useGetSimilarImages } from '../hooks/useGetSimilarImages';
import { ColorProps, color } from 'styled-system';
import IconButton from './IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

type ProductCardProps = {
	handleLabelClick: (label: string) => void;
	isMenuOpen: boolean;
	toggleMenu: (cardId: string) => void;
	product: Product;
	toggleFavorite: (productId: string) => void;
	className?: string;
};

const ProductCard = memo(
	({
		handleLabelClick,
		isMenuOpen,
		toggleMenu,
		product,
		toggleFavorite,
		className,
	}: ProductCardProps) => {
		const { websiteTitle, url, imageUri, infoTags, labels } = product;
		const {
			getSimilarImages,
			isLoading: loadingIdenticalImages,
			error: identicalImagesError,
		} = useGetSimilarImages();
		const {
			annotateImage,
			isLoading: tagsLoading,
			error: annotateError,
		} = useAnnotateImage();
		const isLoading = loadingIdenticalImages || tagsLoading;
		const contentRef = useRef<any>(null);
		const [span, setSpan] = useState<null | number>(null);
		const { gutter, row } = masonrySizes;

		const resizeItem = () => {
			const contentHeight = contentRef.current.getBoundingClientRect()
				.height;
			const rowsToSpan =
				contentHeight && Math.ceil((contentHeight + gutter) / row);
			setSpan(rowsToSpan);
		};

		const debouncedResizeItem = _.debounce(resizeItem, 200);

		useEffect(() => {
			resizeItem();
		});

		useEffect(() => {
			window.addEventListener('resize', debouncedResizeItem);
			return () =>
				window.removeEventListener('resize', debouncedResizeItem);
		});

		useEffect(() => {
			imagesLoaded(contentRef.current, resizeItem);
		}, []);

		return (
			<MasonryItem gutter={gutter} span={span}>
				<ProductCardContainer ref={contentRef}>
					<Box mb={2}>
						<Flex mb={2} position='relative'>
							<FavoriteButton
								onClick={() => toggleFavorite(product.url)}
								color='primary'
							>
								{product.isFavorite ? (
									<FavoriteIcon />
								) : (
									<FavoriteBorderIcon />
								)}
							</FavoriteButton>
							{infoTags?.map(infoTag => {
								const { title, value } = infoTag;
								return <InfoTag title={title} value={value} />;
							})}
						</Flex>
						<Box mb={2}>
							<a
								href={url}
								target='_blank'
								rel='noreferrer noopener'
							>
								{websiteTitle}
							</a>
						</Box>
						<Image width={1} src={imageUri || ''} alt='' />
						<Flex flexWrap='wrap'>
							{labels &&
								labels.map(label => (
									<LabelChip
										size='small'
										id={label}
										onClick={() => handleLabelClick(label)}
										mr={2}
										mb={1}
										label={label}
										// icon={_.includes(moreLabels, tag) ? < DoneIcon /> : <RadioButtonUncheckedIcon />}
									/>
								))}
						</Flex>
					</Box>
					<CardMenu
						isLoading={isLoading}
						isOpen={isMenuOpen}
						toggleMenu={(
							e: React.MouseEvent | React.TouchEvent
						) => {
							e.stopPropagation();
							toggleMenu(product.url);
						}}
						searchByImage={() =>
							getSimilarImages(imageUri, product.url)
						}
						annotateImage={() =>
							annotateImage(product.url, product.imageUri)
						}
					/>
				</ProductCardContainer>
			</MasonryItem>
		);
	}
);

export default ProductCard;

const MasonryItem = styled(Box).attrs<{ gutter: number }>(props => ({
	p: `${props.gutter / 2}px`,
}))<{ span: number | null; gutter: number }>`
	grid-row-end: span ${props => props.span};
`;

const ProductCardContainer = styled(Card).attrs({
	p: 2,
	pb: '54px',
	borderRadius: 2,
	boxShadow: 'small',
})`
	overflow: hidden;
	position: relative;
`;

const LabelChip = styled(Chip)``;

const FavoriteButton = styled(IconButton)`
	padding: 0;
	position: absolute;
	top: 0;
	right: 0;
`;

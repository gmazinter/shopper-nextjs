import React, { useRef, useEffect, useState } from 'react';
import { Box, Card } from '../../framework/components/primitives';
import styled from 'styled-components';
import { Product } from '../../types';
import imagesLoaded from 'imagesloaded';
import { masonrySizes } from '../../consts';
import _ from 'lodash';
import CardMenu from './CardMenu';
import { useAnnotateImage } from './hooks/useAnnotateImage';
import { useGetSimilarImages } from './hooks/useGetSimilarImages';
import CardContent from './CardContent';
import { useResponsive } from '../../framework/hooks/useResponsive';
import useProductCard from './hooks/useProductCard';

export type ProductCardProps = {
	isMenuOpen: boolean;
	toggleMenu: (cardId: string) => void;
	product?: Product;
	className?: string;
};

const cardPadding = 2;

const ProductCard = ({ isMenuOpen, toggleMenu, product }: ProductCardProps) => {
	const { imageUri, price } = product;
	const {
		getSimilarImages,
		isLoading: loadingIdenticalImages,
	} = useGetSimilarImages();
	const { annotateImage, isLoading: tagsLoading } = useAnnotateImage();
	const isLoading = loadingIdenticalImages || tagsLoading;
	const contentRef = useRef<any>(null);
	const [span, setSpan] = useState<null | number>(null);

	const { useMediaQuery } = useResponsive();
	const gutter = useMediaQuery({ _: 10, sm: 16 });
	const { row } = masonrySizes;

	const resizeItem = () => {
		const contentHeight = contentRef.current.getBoundingClientRect().height;
		const rowsToSpan =
			contentHeight && Math.ceil((contentHeight + gutter) / row);
		setSpan(rowsToSpan);
	};

	const debouncedResizeItem = _.debounce(() => {
		// console.log('window change resizeItem');
		resizeItem();
	}, 200);

	useEffect(() => {
		window.addEventListener('resize', debouncedResizeItem);
		return () => window.removeEventListener('resize', debouncedResizeItem);
	});

	useEffect(() => {
		// console.log('labels change resizeItem');
		resizeItem();
	}, [product.labels]);

	useEffect(() => {
		// console.log('imagesLoaded resizeItem');
		imagesLoaded(contentRef.current, resizeItem);
	}, []);

	const { toggleFavorite, handleLabelClick } = useProductCard();

	console.log('rendering card');

	return (
		<MasonryItem gutter={gutter as number} span={span}>
			<ProductCardContainer ref={contentRef}>
				<CardContent
					product={product}
					toggleFavorite={toggleFavorite}
					handleLabelClick={handleLabelClick}
				/>
				<CardMenu
					cardPadding={cardPadding}
					price={price}
					isLoading={isLoading}
					isOpen={isMenuOpen}
					toggleMenu={(e: React.MouseEvent | React.TouchEvent) => {
						e.stopPropagation();
						toggleMenu(product.url);
					}}
					searchByImage={() => getSimilarImages(imageUri)}
					annotateImage={() =>
						annotateImage(product.url, product.imageUri)
					}
				/>
			</ProductCardContainer>
		</MasonryItem>
	);
};

export default ProductCard;

const MasonryItem = styled(Box).attrs<{ gutter: number }>(props => ({
	p: `${props.gutter / 2}px`,
}))<{ span: number | null; gutter: number }>`
	grid-row-end: span ${props => props.span};
`;

const ProductCardContainer = styled(Card).attrs({
	p: cardPadding,
	pb: '54px',
	borderRadius: 2,
	boxShadow: 'small',
})`
	overflow: hidden;
	position: relative;
`;

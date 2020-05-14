import React, { useRef, useEffect, useState, memo } from 'react';
import { Box, Card } from '../../framework/components/primitives';
import styled from 'styled-components';
import { Product } from '../../types';
import imagesLoaded from 'imagesloaded';
import { masonrySizes } from '../../consts';
import _ from 'lodash';
import CardMenu from './CardMenu';
import { useAnnotateImage } from './hooks/useAnnotateImage';
import CardContent from './CardContent';
import { useResponsive } from '../../framework/hooks/useResponsive';

export type ProductCardProps = {
	isMenuOpen: boolean;
	toggleMenu: (cardId: string, isCurrentOpen: boolean) => void;
	product?: Product;
	className?: string;
	toggleFavorite: any;
	handleLabelClick: any;
	getSimilarImages: (imageUri: string) => void;
	loadingSimilarImages: boolean;
};

const cardPadding = 2;

const ProductCard = memo(
	({
		isMenuOpen,
		toggleMenu,
		product,
		toggleFavorite,
		handleLabelClick,
		getSimilarImages,
		loadingSimilarImages,
	}: ProductCardProps) => {
		const { url, imageUri, price, labels } = product;
		const { annotateImage, isLoading: tagsLoading } = useAnnotateImage();
		const isLoading = loadingSimilarImages || tagsLoading;
		const contentRef = useRef<any>(null);
		const [span, setSpan] = useState<null | number>(null);

		const { useMediaQuery } = useResponsive();
		const gutter = useMediaQuery({ _: 10, sm: 16 });
		const { row } = masonrySizes;

		const resizeItem = () => {
			const contentHeight = contentRef.current.getBoundingClientRect()
				.height;
			const rowsToSpan =
				contentHeight && Math.ceil((contentHeight + gutter) / row);
			setSpan(rowsToSpan);
		};

		const debouncedResizeItem = _.debounce(() => {
			resizeItem();
		}, 200);

		useEffect(() => {
			window.addEventListener('resize', debouncedResizeItem);
			return () =>
				window.removeEventListener('resize', debouncedResizeItem);
		});

		useEffect(() => {
			resizeItem();
		}, [labels]);

		useEffect(() => {
			imagesLoaded(contentRef.current, resizeItem);
		}, []);

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
						toggleMenu={(
							e: React.MouseEvent | React.TouchEvent
						) => {
							e.stopPropagation();
							toggleMenu(url, isMenuOpen);
						}}
						searchByImage={() => getSimilarImages(imageUri)}
						annotateImage={() => annotateImage(url, imageUri)}
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
	p: cardPadding,
	pb: '54px',
	borderRadius: 2,
	boxShadow: 'small',
})`
	overflow: hidden;
	position: relative;
`;

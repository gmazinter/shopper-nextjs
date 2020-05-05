import React, { useRef, useEffect, useState, memo } from 'react';
import { Box, Card } from '../../framework/components/primitives';
import styled from 'styled-components';
import { Product } from '../../types';
import imagesLoaded from 'imagesloaded';
import { masonrySizes } from '../../consts';
import _ from 'lodash';
import CardMenu from './CardMenu';
import { useAnnotateImage } from '../../hooks/useAnnotateImage';
import { useGetSimilarImages } from '../../hooks/useGetSimilarImages';
import CardContent from './CardContent';
import { useResponsive } from '../../framework/hooks/useResponsive';

type ProductCardProps = {
	handleLabelClick: (label: string) => void;
	isMenuOpen: boolean;
	toggleMenu: (cardId: string) => void;
	product: Product;
	toggleFavorite: (productId: string) => void;
	className?: string;
};

const cardPadding = 2;

const ProductCard = memo(
	({
		handleLabelClick,
		isMenuOpen,
		toggleMenu,
		product,
		toggleFavorite,
	}: ProductCardProps) => {
		const { imageUri, price } = product;
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

		const { renderResponsive } = useResponsive();
		const gutter = renderResponsive({ _: 10, sm: 16 });
		const { row } = masonrySizes;

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
	p: cardPadding,
	pb: '54px',
	borderRadius: 2,
	boxShadow: 'small',
})`
	overflow: hidden;
	position: relative;
`;

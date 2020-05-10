import React from 'react';
import { Box, Text } from '../../framework/components/primitives';
import { Masonry } from './ProductList';
import ProductCard, { ProductCardProps } from './ProductCard';
import { Product } from '../../types';
import Divider from '@material-ui/core/Divider';

type ProductSectionProps = {
	products: Product[];
	showSectionTitle?: boolean;
	activatedCard: string;
	title: string;
} & Partial<ProductCardProps>;

export default ({
	products,
	showSectionTitle = true,
	title,
	handleLabelClick,
	activatedCard,
	toggleMenu,
	toggleFavorite,
}: ProductSectionProps) => {
	return (
		<Box mt={3}>
			{showSectionTitle && (
				<>
					<Text>{title}</Text>
					<Divider />
				</>
			)}
			<Masonry>
				{products.map((product: Product) => (
					<ProductCard
						handleLabelClick={handleLabelClick}
						isMenuOpen={product.url === activatedCard}
						toggleMenu={toggleMenu}
						key={product.url}
						product={product}
						toggleFavorite={toggleFavorite}
					/>
				))}
			</Masonry>
		</Box>
	);
};

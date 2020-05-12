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
	activatedCard,
	toggleMenu,
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
						isMenuOpen={product.url === activatedCard}
						toggleMenu={toggleMenu}
						key={product.url}
						product={product}
					/>
				))}
			</Masonry>
		</Box>
	);
};

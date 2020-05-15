import React from 'react';
import { Box, Text } from '../../framework/components/primitives';
import { Masonry } from './ProductList';
import { ProductCardProps } from './ProductCard';
import ProductCardWrapper from './ProductCardWrapper';
import { Product } from '../../types';
import Divider from '@material-ui/core/Divider';

type ProductSectionProps = {
	products: Product[];
	showSectionTitle?: boolean;
	activeCard: string;
	title: string;
} & Partial<ProductCardProps>;

export default ({
	products,
	showSectionTitle = true,
	title,
	activeCard,
	toggleMenu,
}: ProductSectionProps) => {
	return (
		<Box mt={3}>
			{showSectionTitle && (
				<Box p={{ _: 2, sm: 'unset' }}>
					<Text>{title}</Text>
					<Divider />
				</Box>
			)}
			<Masonry>
				{products.map((product: Product) => (
					<ProductCardWrapper
						isMenuOpen={product.url === activeCard}
						toggleMenu={toggleMenu}
						key={product.url}
						product={product}
					/>
				))}
			</Masonry>
		</Box>
	);
};

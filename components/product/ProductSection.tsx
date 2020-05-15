import React from 'react';
import { Box, Text } from '../../framework/components/primitives';
import { ProductCardProps } from './ProductCard';
import ProductCardWrapper from './ProductCardWrapper';
import { Product } from '../../types';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';
import { masonrySizes } from '../../consts';
const { row } = masonrySizes;

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

const Masonry = styled(Box).attrs({
	mx: { sm: -2 },
	gridTemplateColumns: {
		_: 'repeat(auto-fill, minmax(180px, 1fr))',
		sm: 'repeat(auto-fill, minmax(200px, 1fr))',
		md: 'repeat(auto-fill, minmax(240px, 1fr))',
	},
})`
	display: grid;
	grid-auto-rows: ${row}px;
`;

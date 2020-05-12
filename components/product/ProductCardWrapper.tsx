import { ProductCardProps } from './ProductCard';
import ProductCard from './ProductCard';

export default ({ isMenuOpen, toggleMenu, product }: ProductCardProps) => (
	<ProductCard
		isMenuOpen={isMenuOpen}
		toggleMenu={toggleMenu}
		key={product.url}
		product={product}
	/>
);

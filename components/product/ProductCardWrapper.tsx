import { ProductCardProps } from './ProductCard';
import ProductCard from './ProductCard';
import { useGetSimilarImages } from './hooks/useGetSimilarImages';

export default ({
	isMenuOpen,
	toggleMenu,
	product,
	toggleFavorite,
	handleLabelClick,
}: Partial<ProductCardProps>) => {
	const { getSimilarImages, isLoading } = useGetSimilarImages();
	return (
		<ProductCard
			isMenuOpen={isMenuOpen}
			toggleMenu={toggleMenu}
			key={product.url}
			product={product}
			toggleFavorite={toggleFavorite}
			handleLabelClick={handleLabelClick}
			getSimilarImages={getSimilarImages}
			loadingSimilarImages={isLoading}
		/>
	);
};

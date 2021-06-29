import { ProductCardProps } from './ProductCard';
import ProductCard from './ProductCard';
import { useGetSimilarImages } from './hooks/useGetSimilarImages';
import { useProductCard } from './hooks/useProductCard';

const ProductCardWrapper = (
    {
        isMenuOpen,
        toggleMenu,
        product,
    }: Partial<ProductCardProps>
) => {
	const { toggleFavorite, handleLabelClick } = useProductCard();
	const { getSimilarImages, isLoading } = useGetSimilarImages();
	return (
		<ProductCard
			isMenuOpen={isMenuOpen}
			toggleMenu={toggleMenu}
			product={product}
			toggleFavorite={toggleFavorite}
			handleLabelClick={handleLabelClick}
			getSimilarImages={getSimilarImages}
			loadingSimilarImages={isLoading}
		/>
	);
};

export default ProductCardWrapper;

const ProductSkeleton = () => {
    return (
        <div className="product-skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
                <div className="skeleton-line skeleton-title"></div>
                <div className="skeleton-line skeleton-text"></div>
                <div className="skeleton-line skeleton-price"></div>
                <div className="skeleton-details">
                    <div className="skeleton-line skeleton-detail"></div>
                    <div className="skeleton-line skeleton-detail"></div>
                </div>
                <div className="skeleton-button"></div>
            </div>
        </div>
    );
};

export const ProductsGridSkeleton = ({ count = 6 }) => {
    return (
        <div className="products-grid">
            {Array.from({ length: count }, (_, index) => (
                <ProductSkeleton key={index} />
            ))}
        </div>
    );
};

export default ProductSkeleton;
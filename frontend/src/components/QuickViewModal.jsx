import { useState } from 'react';
import { useCart } from '../hooks/useCart';

const QuickViewModal = ({ product, isOpen, onClose }) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const { addToCart, isInCart } = useCart();

    // Validación temprana - si no está abierto o no hay producto, no renderizar
    if (!isOpen || !product) return null;

    // Inicializar estados cuando el producto cambia
    if (selectedSize === '' && product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
    }

    if (selectedColor === '' && product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
    }

    const handleAddToCart = () => {
        // Validar que tengamos selecciones válidas
        if (!selectedSize || !selectedColor) {
            console.error('Selecciones inválidas');
            return;
        }

        const productWithSelection = {
            ...product,
            selectedSize,
            selectedColor
        };
        addToCart(productWithSelection);
        onClose();
    };

    const isProductInCart = isInCart(product.id);

    // Render condicional para propiedades que podrían ser undefined
    const safeSizes = product.sizes || [];
    const safeColors = product.colors || [];
    const safeCategory = product.category || 'general';
    const safeName = product.name || 'Producto';
    const safeDescription = product.description || '';
    const safePrice = product.price || 0;
    const safeInStock = product.inStock !== undefined ? product.inStock : true;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Vista Rápida</h2>
                    <button className="close-modal" onClick={onClose}>×</button>
                </div>

                <div className="modal-content">
                    <div className="modal-image">
                        <div className="image-placeholder-large">
                            {safeCategory === 'premium' ? '🌟' :
                                safeCategory === 'deportivo' ? '⚡' : '👕'}
                        </div>
                    </div>

                    <div className="modal-details">
                        <h3>{safeName}</h3>
                        <p className="modal-description">{safeDescription}</p>
                        <p className="modal-price">${safePrice}</p>

                        {/* Selector de Talla - solo mostrar si hay tallas */}
                        {safeSizes.length > 0 && (
                            <div className="selector-group">
                                <label>Talla:</label>
                                <div className="size-selector">
                                    {safeSizes.map(size => (
                                        <button
                                            key={size}
                                            className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Selector de Color - solo mostrar si hay colores */}
                        {safeColors.length > 0 && (
                            <div className="selector-group">
                                <label>Color:</label>
                                <div className="color-selector">
                                    {safeColors.map(color => (
                                        <button
                                            key={color}
                                            className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                                            onClick={() => setSelectedColor(color)}
                                            title={color}
                                        >
                                            <span className="color-dot" style={{
                                                backgroundColor: color === 'negro' ? '#000' :
                                                    color === 'azul' ? '#3498db' :
                                                        color === 'gris' ? '#95a5a6' :
                                                            color === 'azul marino' ? '#2c3e50' :
                                                                color === 'beige' ? '#f5deb3' :
                                                                    color === 'burgundy' ? '#800020' :
                                                                        color === 'rojo' ? '#e74c3c' :
                                                                            color === 'verde' ? '#27ae60' : '#bdc3c7'
                                            }}></span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Detalles del producto */}
                        <div className="product-features">
                            <div className="feature">
                                <strong>Categoría:</strong> {safeCategory}
                            </div>
                            <div className="feature">
                                <strong>Stock:</strong> {safeInStock ? 'Disponible' : 'Agotado'}
                            </div>
                        </div>

                        {/* Acciones */}
                        <div className="modal-actions">
                            <button
                                className={`add-to-cart-btn large ${isProductInCart ? 'in-cart' : ''}`}
                                onClick={handleAddToCart}
                                disabled={!safeInStock}
                            >
                                {isProductInCart ? '✅ En el Carrito' : '🛒 Agregar al Carrito'}
                            </button>
                            <button className="continue-shopping-btn" onClick={onClose}>
                                Seguir Comprando
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
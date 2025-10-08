import { useCart } from '../hooks/useCart';

const Cart = ({ isOpen, onClose }) => {
    const {
        items,
        removeFromCart,
        getCartTotal,
        clearCart,
        incrementQuantity,
        decrementQuantity,
        getSubtotal
    } = useCart();

    if (!isOpen) return null;

    const handleClearCart = () => {
        clearCart();
        window.location.reload(); // Comenta para no recarga la pagina
    };

    const handleCheckout = () => {
        alert('¡Gracias por tu compra! Total: $' + getCartTotal().toFixed(2));
        clearCart();
        window.location.reload(); // onClose();
    };

    return (
        <div className="cart-overlay" onClick={onClose}>
            <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>🛒 Tu Carrito ({items.length} items)</h2>
                    <button className="close-cart" onClick={onClose}>×</button>
                </div>

                <div className="cart-content">
                    {items.length === 0 ? (
                        <div className="empty-cart">
                            <p>Tu carrito está vacío</p>
                            <span>¡Agrega algunos pullovers!</span>
                            <button
                                className="continue-shopping-btn"
                                onClick={onClose}
                            >
                                Seguir Comprando
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {items.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <div className="item-image">
                                            <div className="image-placeholder-small">
                                                {item.category === 'premium' ? '🌟' :
                                                    item.category === 'deportivo' ? '⚡' : '👕'}
                                            </div>
                                        </div>

                                        <div className="item-details">
                                            <h4>{item.name}</h4>
                                            <p className="item-price">${item.price}</p>

                                            <div className="quantity-controls">
                                                <button
                                                    onClick={() => decrementQuantity(item.id)}
                                                    className="quantity-btn"
                                                >
                                                    -
                                                </button>
                                                <span className="quantity">{item.quantity}</span>
                                                <button
                                                    onClick={() => incrementQuantity(item.id)}
                                                    className="quantity-btn"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="item-total">
                                            ${getSubtotal(item.id).toFixed(2)}
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="remove-btn"
                                                title="Eliminar producto"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-footer">
                                <div className="cart-total">
                                    <strong>Total: ${getCartTotal().toFixed(2)}</strong>
                                </div>

                                <div className="cart-actions">
                                    <button
                                        className="clear-cart-btn"
                                        onClick={handleClearCart}
                                        title="Vaciar todo el carrito"
                                    >
                                        🗑️ Limpiar Carrito
                                    </button>
                                    <button
                                        className="checkout-btn"
                                        onClick={handleCheckout}
                                    >
                                        ✅ Finalizar Compra
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
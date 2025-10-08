import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

// Hook personalizado para usar el carrito
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de CartProvider');
    }

    // Métodos auxiliares para validación
    const validateQuantity = (quantity) => {
        return Number.isInteger(quantity) && quantity >= 0;
    };

    const validateProduct = (product) => {
        return product &&
            typeof product === 'object' &&
            'id' in product &&
            'price' in product &&
            'name' in product;
    };

    // Métodos mejorados con validación
    const addToCart = (product) => {
        if (!validateProduct(product)) {
            console.error('Producto inválido:', product);
            throw new Error('Producto inválido. Debe tener id, precio y nombre');
        }
        context.addToCart(product);
    };

    const updateQuantity = (productId, quantity) => {
        if (!validateQuantity(quantity)) {
            console.error('Cantidad inválida:', quantity);
            throw new Error('Cantidad inválida. Debe ser un número entero positivo');
        }
        context.updateQuantity(productId, quantity);
    };

    // Métodos de utilidad adicionales
    const isInCart = (productId) => {
        return context.items.some(item => item.id === productId);
    };

    const getItemQuantity = (productId) => {
        const item = context.items.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };

    const getSubtotal = (productId) => {
        const item = context.items.find(item => item.id === productId);
        return item ? (item.price * item.quantity) : 0;
    };

    // Nuevo método: aumentar/disminuir cantidad fácilmente
    const incrementQuantity = (productId) => {
        const currentQuantity = getItemQuantity(productId);
        updateQuantity(productId, currentQuantity + 1);
    };

    const decrementQuantity = (productId) => {
        const currentQuantity = getItemQuantity(productId);
        if (currentQuantity > 1) {
            updateQuantity(productId, currentQuantity - 1);
        } else {
            context.removeFromCart(productId);
        }
    };

    return {
        // Métodos originales del context
        items: context.items,
        removeFromCart: context.removeFromCart,
        clearCart: context.clearCart,
        getCartTotal: context.getCartTotal,
        getCartItemsCount: context.getCartItemsCount,

        // Métodos mejorados
        addToCart,
        updateQuantity,

        // Nuevos métodos de utilidad
        isInCart,
        getItemQuantity,
        getSubtotal,
        incrementQuantity,
        decrementQuantity,
    };
};
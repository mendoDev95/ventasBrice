import { useReducer, useEffect } from 'react';
import { CartContext } from './CartContext';

// Reducer para manejar acciones del carrito
const cartReducer = (state, action) => {
    const existingItem = state.items.find(item => item.id === action.payload.id);

    switch (action.type) {
        case 'ADD_TO_CART':

            if (existingItem) {
                // Si ya existe, aumentar cantidad
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                };
            } else {
                // Si es nuevo, agregar al carrito
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }]
                };
            }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };

        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
            };

        case 'CLEAR_CART':
            return {
                ...state,
                items: []
            };

        case 'LOAD_CART':
            return {
                ...state,
                items: action.payload || []
            };

        default:
            return state;
    }
};

// Provider Component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        items: []
    });

    // Cargar carrito desde localStorage al iniciar
    useEffect(() => {
        const savedCart = localStorage.getItem('pullovers-cart');
        if (savedCart) {
            dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
        }
    }, []);

    // Guardar carrito en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('pullovers-cart', JSON.stringify(state.items));
    }, [state.items]);

    // Calcular totales
    const getCartTotal = () => {
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartItemsCount = () => {
        return state.items.reduce((total, item) => total + item.quantity, 0);
    };

    const value = {
        items: state.items,
        addToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
        removeFromCart: (productId) => dispatch({ type: 'REMOVE_FROM_CART', payload: productId }),
        updateQuantity: (productId, quantity) => dispatch({
            type: 'UPDATE_QUANTITY',
            payload: { id: productId, quantity }
        }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
        getCartTotal,
        getCartItemsCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
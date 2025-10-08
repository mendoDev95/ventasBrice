import { useCart } from '../hooks/useCart';

const Header = ({ onCartOpen }) => {
    const { getCartItemsCount } = useCart();

    return (
        <header className="app-header">
            <div className="header-content">
                <div className="logo">
                    <h1>Ventas Brice</h1>
                    <p>Encuentra tu estilo perfecto</p>
                </div>

                <button className="cart-button" onClick={onCartOpen}>
                    🛒 Carrito
                    {getCartItemsCount() > 0 && (
                        <span className="cart-badge">{getCartItemsCount()}</span>
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from './hooks/useCart';
import Header from './components/Header';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { addToCart, isInCart, getItemQuantity } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/products');
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError('Error cargando productos. Verifica que el backend esté corriendo.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    try {
      addToCart(product);
      // Podría agregar una notificación aquí en el futuro
    } catch (error) {
      console.error('Error agregando al carrito:', error);
    }
  };

  const getButtonText = (product) => {
    if (!product.inStock) return '❌ Agotado';
    if (isInCart(product.id)) return `✅ En Carrito (${getItemQuantity(product.id)})`;
    return '🛒 Agregar al Carrito';
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner">🔄</div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Header onCartOpen={() => setIsCartOpen(true)} />

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="products-stats">
        <p>Mostrando {products.length} productos</p>
      </div>

      <main className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <div className="image-placeholder">
                {product.category === 'premium' ? '🌟' :
                  product.category === 'deportivo' ? '⚡' : '👕'}
              </div>
              {product.inStock && <span className="stock-badge">En Stock</span>}
            </div>

            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>

              <div className="product-details">
                <div className="detail-item">
                  <strong>Tallas:</strong> {product.sizes.join(', ')}
                </div>
                <div className="detail-item">
                  <strong>Colores:</strong> {product.colors.join(', ')}
                </div>
                <div className="detail-item">
                  <strong>Categoría:</strong> {product.category}
                </div>
              </div>

              <button
                className={`add-to-cart-btn ${isInCart(product.id) ? 'in-cart' : ''}`}
                onClick={() => handleAddToCart(product)}
                disabled={!product.inStock}
              >
                {getButtonText(product)}
              </button>
            </div>
          </div>
        ))}
      </main>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <footer className="app-footer">
        <p> Desarrollado por mendoDev95 con React + Express + pnpm </p>
      </footer>
    </div>
  );
}

export default App;
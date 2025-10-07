import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const addToCart = (product) => {
    alert(`🎉 ¡${product.name} agregado al carrito!`);
    // Aquí implementaremos la lógica del carrito después
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
      <header className="app-header">
        <h1> Ventas Brice </h1>
        <p>Encuentra tu estilo perfecto</p>
      </header>

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
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
              >
                {product.inStock ? '🛒 Agregar al Carrito' : '❌ Agotado'}
              </button>
            </div>
          </div>
        ))}
      </main>

      <footer className="app-footer">
        <p>Desarrollado por MendoDev con React + Express + pnpm</p>
      </footer>
    </div>
  );
}

export default App;
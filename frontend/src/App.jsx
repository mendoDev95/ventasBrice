import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useCart } from './hooks/useCart';
import { useFilters } from './hooks/useFilters';
import { useToast } from './hooks/useToast';
import Header from './components/Header';
import Cart from './components/Cart';
import FilterSidebar from './components/FilterSidebar';
import QuickViewModal from './components/QuickViewModal';
import { ProductsGridSkeleton } from './components/ProductSkeleton';
import { ToastContainer } from './components/Toast';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { filteredProducts, filters } = useFilters(products);
  const { toasts, removeToast, toastSuccess, toastError } = useToast();

  // Usar useCallback para loadProducts
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/products');
      setProducts(response.data);
      setError('');
    } catch (err) {
      const errorMessage = 'Error cargando productos. Verifica que el backend esté corriendo.';
      setError(errorMessage);
      toastError(errorMessage);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, [toastError]); // ← Incluir toastError en las dependencias

  useEffect(() => {
    loadProducts();
  }, [loadProducts]); // ← Incluir loadProducts en las dependencias

  const handleAddToCart = (product) => {
    try {
      addToCart(product);
      toastSuccess(`¡${product.name} agregado al carrito!`);
    } catch (error) {
      console.error('Error agregando al carrito:', error);
      toastError('Error al agregar el producto al carrito');
    }
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const getButtonText = (product) => {
    if (!product.inStock) return '❌ Agotado';
    if (isInCart(product.id)) return `✅ En Carrito (${getItemQuantity(product.id)})`;
    return '🛒 Agregar al Carrito';
  };

  return (
    <div className="App">
      <Header
        onCartOpen={() => setIsCartOpen(true)}
        onFilterOpen={() => setIsFilterOpen(true)}
      />

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Estadísticas con contador de filtros */}
      <div className="products-stats">
        <p>
          Mostrando {filteredProducts.length} de {products.length} productos
          {filters.searchTerm && ` · Búsqueda: "${filters.searchTerm}"`}
          {filters.category !== 'all' && ` · Categoría: ${filters.category}`}
        </p>
      </div>

      <main>
        {loading ? (
          <ProductsGridSkeleton count={6} />
        ) : filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>No se encontraron productos</p>
            <span>Intenta ajustar los filtros de búsqueda</span>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div
                  className="product-image"
                  onClick={() => handleQuickView(product)}
                >
                  <div className="image-placeholder">
                    {product.category === 'premium' ? '🌟' :
                      product.category === 'deportivo' ? '⚡' : '👕'}
                  </div>
                  {product.inStock && <span className="stock-badge">En Stock</span>}
                  <button
                    className="quick-view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickView(product);
                    }}
                    title="Vista rápida"
                  >
                    👁️
                  </button>
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
          </div>
        )}
      </main>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <footer className="app-footer">
        <p>Desarrollado por mendoDev95 con React + Express + pnpm</p>
      </footer>
    </div>
  );
}

export default App;
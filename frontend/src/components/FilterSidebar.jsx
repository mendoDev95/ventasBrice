import { useFilters } from '../hooks/useFilters';

const FilterSidebar = ({ isOpen, onClose }) => {
    const {
        filters,
        categories,
        priceRange,
        updateCategory,
        updatePriceRange,
        updateSearchTerm,
        updateSortBy,
        clearFilters
    } = useFilters();

    if (!isOpen) return null;

    return (
        <div className="filter-overlay" onClick={onClose}>
            <div className="filter-sidebar" onClick={(e) => e.stopPropagation()}>
                <div className="filter-header">
                    <h2>🔍 Filtros</h2>
                    <button className="close-filter" onClick={onClose}>×</button>
                </div>

                <div className="filter-content">
                    {/* Búsqueda */}
                    <div className="filter-section">
                        <h3>Buscar</h3>
                        <input
                            type="text"
                            placeholder="Buscar pullovers..."
                            value={filters.searchTerm}
                            onChange={(e) => updateSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    {/* Ordenamiento */}
                    <div className="filter-section">
                        <h3>Ordenar por</h3>
                        <select
                            value={filters.sortBy}
                            onChange={(e) => updateSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="name">Nombre A-Z</option>
                            <option value="price-asc">Precio: Menor a Mayor</option>
                            <option value="price-desc">Precio: Mayor a Menor</option>
                        </select>
                    </div>

                    {/* Categorías */}
                    <div className="filter-section">
                        <h3>Categorías</h3>
                        <div className="category-filters">
                            {categories.map(category => (
                                <label key={category} className="category-label">
                                    <input
                                        type="radio"
                                        name="category"
                                        value={category}
                                        checked={filters.category === category}
                                        onChange={(e) => updateCategory(e.target.value)}
                                    />
                                    <span className="category-text">
                                        {category === 'all' ? 'Todas las categorías' :
                                            category === 'clasico' ? 'Clásico' :
                                                category === 'premium' ? 'Premium' :
                                                    category === 'deportivo' ? 'Deportivo' : category}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Rango de Precios */}
                    <div className="filter-section">
                        <h3>Precio: ${filters.priceRange[0]} - ${filters.priceRange[1]}</h3>
                        <div className="price-range">
                            <input
                                type="range"
                                min={priceRange.min}
                                max={priceRange.max}
                                value={filters.priceRange[0]}
                                onChange={(e) => updatePriceRange([parseInt(e.target.value), filters.priceRange[1]])}
                                className="price-slider"
                            />
                            <input
                                type="range"
                                min={priceRange.min}
                                max={priceRange.max}
                                value={filters.priceRange[1]}
                                onChange={(e) => updatePriceRange([filters.priceRange[0], parseInt(e.target.value)])}
                                className="price-slider"
                            />
                        </div>
                        <div className="price-labels">
                            <span>${priceRange.min}</span>
                            <span>${priceRange.max}</span>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="filter-actions">
                        <button onClick={clearFilters} className="clear-filters-btn">
                            🗑️ Limpiar Filtros
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
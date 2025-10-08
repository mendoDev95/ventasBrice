import { useState, useMemo } from 'react';

export const useFilters = (products) => {
    const [filters, setFilters] = useState({
        category: 'all',
        priceRange: [0, 100],
        searchTerm: '',
        sortBy: 'name'
    });

    // Aplicar filtros y ordenamiento
    const filteredProducts = useMemo(() => {
        if (!products || products.length === 0) return [];

        let result = [...products];

        // Filtro por categoría
        if (filters.category !== 'all') {
            result = result.filter(product => product.category === filters.category);
        }

        // Filtro por rango de precio
        result = result.filter(product =>
            product.price >= filters.priceRange[0] &&
            product.price <= filters.priceRange[1]
        );

        // Filtro por búsqueda
        if (filters.searchTerm) {
            const term = filters.searchTerm.toLowerCase();
            result = result.filter(product =>
                product.name.toLowerCase().includes(term) ||
                product.description.toLowerCase().includes(term)
            );
        }

        // Ordenamiento
        result.sort((a, b) => {
            switch (filters.sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        return result;
    }, [products, filters]);

    // Obtener categorías únicas para los filtros
    const categories = useMemo(() => {
        if (!products || products.length === 0) return ['all'];
        const allCategories = products.map(product => product.category);
        return ['all', ...new Set(allCategories)];
    }, [products]);

    // Obtener rango de precios para los filtros
    const priceRange = useMemo(() => {
        if (!products || products.length === 0) return { min: 0, max: 100 };
        const prices = products.map(product => product.price);
        return {
            min: Math.floor(Math.min(...prices)),
            max: Math.ceil(Math.max(...prices))
        };
    }, [products]);

    // Métodos para actualizar filtros
    const updateCategory = (category) => {
        setFilters(prev => ({ ...prev, category }));
    };

    const updatePriceRange = (range) => {
        setFilters(prev => ({ ...prev, priceRange: range }));
    };

    const updateSearchTerm = (term) => {
        setFilters(prev => ({ ...prev, searchTerm: term }));
    };

    const updateSortBy = (sort) => {
        setFilters(prev => ({ ...prev, sortBy: sort }));
    };

    const clearFilters = () => {
        const currentPriceRange = priceRange;
        setFilters({
            category: 'all',
            priceRange: [currentPriceRange.min, currentPriceRange.max],
            searchTerm: '',
            sortBy: 'name'
        });
    };

    return {
        filters,
        filteredProducts,
        categories,
        priceRange,
        updateCategory,
        updatePriceRange,
        updateSearchTerm,
        updateSortBy,
        clearFilters
    };
};
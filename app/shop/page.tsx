"use client";

import { useState, useMemo } from "react";
import { products, gases, Product } from "@/data/products";
import StoreProduct from "@/app/components/StoreProduct";
import Newsletter from "@/app/components/Newsletter";

export default function Shop() {
    const allProducts = [...products, ...gases];

    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<'all' | 'stove' | 'gas'>('all');
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'>('name-asc');

    // Get unique brands
    const brands = useMemo(() => {
        const brandSet = new Set(allProducts.map(p => p.brand));
        return Array.from(brandSet).sort();
    }, []);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let results = allProducts;

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            results = results.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.brand.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (categoryFilter !== 'all') {
            results = results.filter(p => p.category === categoryFilter);
        }

        // Brand filter
        if (selectedBrands.length > 0) {
            results = results.filter(p => selectedBrands.includes(p.brand));
        }

        // Price filter
        const min = minPrice ? parseFloat(minPrice) : 0;
        const max = maxPrice ? parseFloat(maxPrice) : Infinity;
        results = results.filter(p => {
            const price = parseFloat(p.price);
            return price >= min && price <= max;
        });

        // Sort
        results = [...results].sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'price-asc':
                    return parseFloat(a.price) - parseFloat(b.price);
                case 'price-desc':
                    return parseFloat(b.price) - parseFloat(a.price);
                default:
                    return 0;
            }
        });

        return results;
    }, [allProducts, searchQuery, categoryFilter, selectedBrands, minPrice, maxPrice, sortBy]);

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const clearFilters = () => {
        setSearchQuery("");
        setCategoryFilter('all');
        setSelectedBrands([]);
        setMinPrice("");
        setMaxPrice("");
        setSortBy('name-asc');
    };

    const hasActiveFilters = searchQuery || categoryFilter !== 'all' || selectedBrands.length > 0 || minPrice || maxPrice;

    return (
        <>
            <section id="page-header">
                <h2>#Shop Now</h2>
                <p>Find the perfect gas appliances for your needs</p>
            </section>

            {/* Search and Filter Section */}
            <section className="section-p1" style={{ background: '#f9f9f9', paddingTop: '30px', paddingBottom: '30px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Search Bar */}
                    <div style={{ marginBottom: '25px' }}>
                        <input
                            type="text"
                            placeholder="Search products by name or brand..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '15px 20px',
                                fontSize: '16px',
                                border: '2px solid #e0e0e0',
                                borderRadius: '8px',
                                outline: 'none',
                                transition: 'border-color 0.3s'
                            }}
                            onFocus={(e) => e.currentTarget.style.borderColor = '#088178'}
                            onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                        />
                    </div>

                    {/* Filters Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                        {/* Category Filter */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Category</label>
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value as any)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="all">All Products ({allProducts.length})</option>
                                <option value="stove">Stoves Only ({products.length})</option>
                                <option value="gas">Gas & Accessories ({gases.length})</option>
                            </select>
                        </div>

                        {/* Sort */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                                <option value="price-asc">Price (Low to High)</option>
                                <option value="price-desc">Price (High to Low)</option>
                            </select>
                        </div>

                        {/* Price Range */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Min Price</label>
                            <input
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '6px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Max Price</label>
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '6px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                    </div>

                    {/* Brand Filter */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#333' }}>Filter by Brand</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {brands.map(brand => (
                                <button
                                    key={brand}
                                    onClick={() => toggleBrand(brand)}
                                    style={{
                                        padding: '8px 16px',
                                        border: selectedBrands.includes(brand) ? '2px solid #088178' : '1px solid #e0e0e0',
                                        background: selectedBrands.includes(brand) ? '#e8f8f5' : 'white',
                                        color: selectedBrands.includes(brand) ? '#088178' : '#666',
                                        borderRadius: '20px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: selectedBrands.includes(brand) ? '600' : '400',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {brand}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Active Filters Info */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid #e0e0e0' }}>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                            Showing <strong>{filteredProducts.length}</strong> of <strong>{allProducts.length}</strong> products
                        </div>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                style={{
                                    padding: '8px 16px',
                                    background: '#e8653f',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                Clear All Filters
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section id="product1" className="section-p1">
                {filteredProducts.length > 0 ? (
                    <div
                        className="pro-container"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                            gap: "20px",
                            paddingTop: "20px",
                        }}
                    >
                        {filteredProducts.map((product) => (
                            <StoreProduct key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <i className="fa fa-search" style={{ fontSize: '48px', color: '#ccc', marginBottom: '15px' }}></i>
                        <h3 style={{ color: '#666' }}>No products found</h3>
                        <p style={{ color: '#999', marginBottom: '20px' }}>Try adjusting your filters or search query</p>
                        <button
                            onClick={clearFilters}
                            className="normal"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </section>

            <Newsletter />
        </>
    );
}

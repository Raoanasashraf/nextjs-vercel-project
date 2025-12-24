"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { products as initialProducts, gases as initialGases } from "@/data/products";

export default function StockManagement() {
    const router = useRouter();
    const [products, setProducts] = useState([...initialProducts, ...initialGases]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editStock, setEditStock] = useState<number>(0);

    useEffect(() => {
        const adminAuth = localStorage.getItem('adminAuth');
        if (!adminAuth) {
            router.push('/admin');
        }

        // Load stock data from localStorage
        const savedStock = localStorage.getItem('productStock');
        if (savedStock) {
            const stockData = JSON.parse(savedStock);
            setProducts(prev => prev.map(p => ({
                ...p,
                stock: stockData[p.id] !== undefined ? stockData[p.id] : 100
            })));
        } else {
            // Initialize with default stock
            setProducts(prev => prev.map(p => ({ ...p, stock: 100 })));
        }
    }, [router]);

    const updateStock = (productId: number, newStock: number) => {
        setProducts(prev => {
            const updated = prev.map(p =>
                p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p
            );

            // Save to localStorage
            const stockData = updated.reduce((acc, p) => {
                acc[p.id] = p.stock || 0;
                return acc;
            }, {} as Record<number, number>);
            localStorage.setItem('productStock', JSON.stringify(stockData));

            return updated;
        });
        setEditingId(null);
    };

    const getStockStatus = (stock: number = 0) => {
        if (stock === 0) return { label: 'Out of Stock', color: '#e74c3c' };
        if (stock < 20) return { label: 'Low Stock', color: '#e8653f' };
        if (stock < 50) return { label: 'Medium', color: '#f39c12' };
        return { label: 'In Stock', color: '#27ae60' };
    };

    return (
        <>
            <section id="page-header">
                <h2>Stock Management</h2>
                <p>Manage your product inventory</p>
            </section>

            <section className="section-p1">
                <div style={{ marginBottom: '30px' }}>
                    <Link href="/admin" style={{ textDecoration: 'none', color: '#088178' }}>
                        ← Back to Dashboard
                    </Link>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                        <thead>
                            <tr style={{ background: '#088178', color: 'white' }}>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Image</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Product</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Brand</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Category</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Price</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Stock</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => {
                                const stockStatus = getStockStatus(product.stock);

                                return (
                                    <tr key={product.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td style={{ padding: '15px' }}>
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                                            />
                                        </td>
                                        <td style={{ padding: '15px' }}>
                                            <strong>{product.name}</strong>
                                        </td>
                                        <td style={{ padding: '15px' }}>{product.brand}</td>
                                        <td style={{ padding: '15px' }}>
                                            <span style={{
                                                padding: '4px 10px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                background: product.category === 'stove' ? '#e8f8f5' : '#fff4e6',
                                                color: product.category === 'stove' ? '#088178' : '#f39c12'
                                            }}>
                                                {product.category}
                                            </span>
                                        </td>
                                        <td style={{ padding: '15px', fontWeight: 'bold', color: '#088178' }}>
                                            Rs {product.price}
                                        </td>
                                        <td style={{ padding: '15px' }}>
                                            {editingId === product.id ? (
                                                <input
                                                    type="number"
                                                    value={editStock}
                                                    onChange={(e) => setEditStock(parseInt(e.target.value) || 0)}
                                                    style={{
                                                        padding: '8px',
                                                        border: '1px solid #088178',
                                                        borderRadius: '4px',
                                                        width: '80px',
                                                        fontSize: '14px'
                                                    }}
                                                    autoFocus
                                                />
                                            ) : (
                                                <strong>{product.stock || 0}</strong>
                                            )}
                                        </td>
                                        <td style={{ padding: '15px' }}>
                                            <span style={{
                                                padding: '5px 12px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                background: stockStatus.color + '20',
                                                color: stockStatus.color
                                            }}>
                                                {stockStatus.label}
                                            </span>
                                        </td>
                                        <td style={{ padding: '15px' }}>
                                            {editingId === product.id ? (
                                                <div style={{ display: 'flex', gap: '5px' }}>
                                                    <button
                                                        onClick={() => updateStock(product.id, editStock)}
                                                        style={{
                                                            padding: '6px 12px',
                                                            background: '#088178',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            fontSize: '12px'
                                                        }}
                                                    >
                                                        ✓ Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        style={{
                                                            padding: '6px 12px',
                                                            background: '#666',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            fontSize: '12px'
                                                        }}
                                                    >
                                                        ✕ Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex', gap: '5px' }}>
                                                    <button
                                                        onClick={() => {
                                                            setEditingId(product.id);
                                                            setEditStock(product.stock || 0);
                                                        }}
                                                        style={{
                                                            padding: '6px 12px',
                                                            background: '#088178',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            fontSize: '12px'
                                                        }}
                                                    >
                                                        Edit Stock
                                                    </button>
                                                    <button
                                                        onClick={() => updateStock(product.id, (product.stock || 0) + 10)}
                                                        style={{
                                                            padding: '6px 12px',
                                                            background: '#27ae60',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            fontSize: '12px'
                                                        }}
                                                    >
                                                        +10
                                                    </button>
                                                    <button
                                                        onClick={() => updateStock(product.id, Math.max(0, (product.stock || 0) - 10))}
                                                        style={{
                                                            padding: '6px 12px',
                                                            background: '#e8653f',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            fontSize: '12px'
                                                        }}
                                                    >
                                                        -10
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Stock Summary */}
                <div style={{
                    marginTop: '40px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px'
                }}>
                    <div style={{ background: '#e8f8f5', padding: '20px', borderRadius: '8px' }}>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Total Products</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#088178' }}>{products.length}</div>
                    </div>
                    <div style={{ background: '#ffe8e8', padding: '20px', borderRadius: '8px' }}>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Low Stock Items</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#e74c3c' }}>
                            {products.filter(p => (p.stock || 0) < 20).length}
                        </div>
                    </div>
                    <div style={{ background: '#fff4e6', padding: '20px', borderRadius: '8px' }}>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Out of Stock</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f39c12' }}>
                            {products.filter(p => (p.stock || 0) === 0).length}
                        </div>
                    </div>
                    <div style={{ background: '#e8ffe8', padding: '20px', borderRadius: '8px' }}>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>In Stock</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#27ae60' }}>
                            {products.filter(p => (p.stock || 0) >= 20).length}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

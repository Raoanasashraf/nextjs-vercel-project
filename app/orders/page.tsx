"use client";

import { useState, useEffect } from "react";
import { useOrder, Order } from "@/app/context/OrderContext";
import Link from "next/link";

export default function OrderHistory() {
    const { orders } = useOrder();
    const [filter, setFilter] = useState<Order['status'] | 'All'>('All');
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    const filteredOrders = filter === 'All'
        ? orders
        : orders.filter(order => order.status === filter);

    const sortedOrders = [...filteredOrders].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'Pending': return '#e8653f';
            case 'Processing': return '#f39c12';
            case 'Shipped': return '#3498db';
            case 'Delivered': return '#27ae60';
            default: return '#666';
        }
    };

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'Pending': return 'fa-clock';
            case 'Processing': return 'fa-cog fa-spin';
            case 'Shipped': return 'fa-truck';
            case 'Delivered': return 'fa-check-circle';
            default: return 'fa-question';
        }
    };

    return (
        <>
            <section id="page-header">
                <h2>My Orders</h2>
                <p>Track and view your order history</p>
            </section>

            <section className="section-p1">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
                    <div>
                        <Link href="/shop" style={{ color: '#088178', textDecoration: 'none' }}>
                            ← Continue Shopping
                        </Link>
                    </div>

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
                        style={{
                            padding: '10px 15px',
                            border: '1px solid #e0e0e0',
                            borderRadius: '6px',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="All">All Orders ({orders.length})</option>
                        <option value="Pending">Pending ({orders.filter(o => o.status === 'Pending').length})</option>
                        <option value="Processing">Processing ({orders.filter(o => o.status === 'Processing').length})</option>
                        <option value="Shipped">Shipped ({orders.filter(o => o.status === 'Shipped').length})</option>
                        <option value="Delivered">Delivered ({orders.filter(o => o.status === 'Delivered').length})</option>
                    </select>
                </div>

                {sortedOrders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                        <i className="fa fa-shopping-bag" style={{ fontSize: '64px', color: '#ccc', marginBottom: '20px' }}></i>
                        <h3 style={{ color: '#666', marginBottom: '10px' }}>No orders yet</h3>
                        <p style={{ color: '#999', marginBottom: '30px' }}>
                            {filter === 'All' ? "You haven't placed any orders yet." : `No ${filter.toLowerCase()} orders.`}
                        </p>
                        <Link href="/shop" className="normal" style={{ display: 'inline-block', textDecoration: 'none', padding: '12px 30px' }}>
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '20px' }}>
                        {sortedOrders.map((order) => (
                            <div
                                key={order.id}
                                style={{
                                    background: 'white',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                                }}
                            >
                                {/* Order Header */}
                                <div
                                    style={{
                                        background: '#f9f9f9',
                                        padding: '20px',
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                        gap: '20px',
                                        borderBottom: '1px solid #e0e0e0'
                                    }}
                                >
                                    <div>
                                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Order Number</div>
                                        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{order.orderNumber}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Order Date</div>
                                        <div style={{ fontSize: '14px' }}>{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Total Amount</div>
                                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#088178' }}>Rs {order.total.toFixed(2)}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Status</div>
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '6px 14px',
                                            borderRadius: '20px',
                                            fontSize: '13px',
                                            fontWeight: 'bold',
                                            background: getStatusColor(order.status) + '20',
                                            color: getStatusColor(order.status)
                                        }}>
                                            <i className={`fa ${getStatusIcon(order.status)}`}></i>
                                            {order.status}
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items Preview */}
                                <div style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' }}>
                                        {order.items.slice(0, 4).map((item, index) => (
                                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #f0f0f0' }}
                                                />
                                                <div>
                                                    <div style={{ fontSize: '13px', fontWeight: '500' }}>{item.name}</div>
                                                    <div style={{ fontSize: '11px', color: '#666' }}>Qty: {item.quantity}</div>
                                                </div>
                                            </div>
                                        ))}
                                        {order.items.length > 4 && (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '50px',
                                                height: '50px',
                                                background: '#f9f9f9',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                color: '#666'
                                            }}>
                                                +{order.items.length - 4}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                                        style={{
                                            padding: '10px 20px',
                                            background: expandedOrder === order.id ? '#666' : '#088178',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            width: '100%'
                                        }}
                                    >
                                        {expandedOrder === order.id ? 'Hide Details' : 'View Order Details'}
                                    </button>
                                </div>

                                {/* Expanded Order Details */}
                                {expandedOrder === order.id && (
                                    <div style={{ background: '#f9f9f9', padding: '20px', borderTop: '1px solid #e0e0e0' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                                            <div>
                                                <h4 style={{ marginBottom: '15px', fontSize: '16px' }}>All Items</h4>
                                                {order.items.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        style={{
                                                            display: 'flex',
                                                            gap: '15px',
                                                            marginBottom: '15px',
                                                            padding: '12px',
                                                            background: 'white',
                                                            borderRadius: '8px'
                                                        }}
                                                    >
                                                        <img
                                                            src={item.imageUrl}
                                                            alt={item.name}
                                                            style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px' }}
                                                        />
                                                        <div style={{ flex: 1 }}>
                                                            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{item.name}</div>
                                                            <div style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>{item.brand}</div>
                                                            <div style={{ fontSize: '14px' }}>
                                                                {item.quantity} × Rs {item.price} = <strong>Rs {(parseFloat(item.price) * item.quantity).toFixed(2)}</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div>
                                                <h4 style={{ marginBottom: '15px', fontSize: '16px' }}>Delivery Information</h4>
                                                <div style={{ background: 'white', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                                                    <div style={{ marginBottom: '12px' }}>
                                                        <strong>Customer:</strong><br />
                                                        <div style={{ marginTop: '5px' }}>{order.customerInfo.name}</div>
                                                    </div>
                                                    <div style={{ marginBottom: '12px' }}>
                                                        <strong>Contact:</strong><br />
                                                        <div style={{ marginTop: '5px' }}>{order.customerInfo.email}</div>
                                                        <div style={{ marginTop: '2px' }}>{order.customerInfo.phone}</div>
                                                    </div>
                                                    <div>
                                                        <strong>Delivery Address:</strong><br />
                                                        <div style={{ marginTop: '5px' }}>
                                                            {order.customerInfo.address}<br />
                                                            {order.customerInfo.city}, {order.customerInfo.postalCode}
                                                        </div>
                                                    </div>
                                                </div>

                                                {order.customerInfo.notes && (
                                                    <div style={{ background: '#fffef0', padding: '15px', borderRadius: '8px' }}>
                                                        <strong>Order Notes:</strong><br />
                                                        <div style={{ marginTop: '8px', fontSize: '14px' }}>{order.customerInfo.notes}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}

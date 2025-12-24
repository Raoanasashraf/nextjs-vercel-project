"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOrder, Order } from "@/app/context/OrderContext";
import Link from "next/link";

export default function OrdersManagement() {
    const router = useRouter();
    const { orders, updateOrderStatus } = useOrder();
    const [filter, setFilter] = useState<Order['status'] | 'All'>('All');
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    useEffect(() => {
        const adminAuth = localStorage.getItem('adminAuth');
        if (!adminAuth) {
            router.push('/admin');
        }
    }, [router]);

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

    return (
        <>
            <section id="page-header">
                <h2>Orders Management</h2>
                <p>View and manage all customer orders</p>
            </section>

            <section className="section-p1">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <Link href="/admin" style={{ textDecoration: 'none', color: '#088178' }}>
                        ← Back to Dashboard
                    </Link>

                    <div style={{ display: 'flex', gap: '10px' }}>
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
                            <option value="All">All Orders({orders.length})</option>
                            <option value="Pending">Pending ({orders.filter(o => o.status === 'Pending').length})</option>
                            <option value="Processing">Processing ({orders.filter(o => o.status === 'Processing').length})</option>
                            <option value="Shipped">Shipped ({orders.filter(o => o.status === 'Shipped').length})</option>
                            <option value="Delivered">Delivered ({orders.filter(o => o.status === 'Delivered').length})</option>
                        </select>
                    </div>
                </div>

                {sortedOrders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <i className="fa fa-inbox" style={{ fontSize: '48px', color: '#ccc', marginBottom: '15px' }}></i>
                        <h3 style={{ color: '#666' }}>No orders found</h3>
                        <p style={{ color: '#999' }}>
                            {filter === 'All' ? 'No orders have been placed yet.' : `No ${filter.toLowerCase()} orders.`}
                        </p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                            <thead>
                                <tr style={{ background: '#088178', color: 'white' }}>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>Order #</th>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>Customer</th>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>Contact</th>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>Items</th>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>Total</th>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>Date</th>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedOrders.map((order) => (
                                    <>
                                        <tr key={order.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                            <td style={{ padding: '15px' }}>
                                                <strong>{order.orderNumber}</strong>
                                            </td>
                                            <td style={{ padding: '15px' }}>{order.customerInfo.name}</td>
                                            <td style={{ padding: '15px' }}>
                                                <div style={{ fontSize: '12px' }}>
                                                    <div>{order.customerInfo.email}</div>
                                                    <div>{order.customerInfo.phone}</div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '15px' }}>{order.items.length}</td>
                                            <td style={{ padding: '15px', fontWeight: 'bold', color: '#088178' }}>
                                                Rs {order.total.toFixed(2)}
                                            </td>
                                            <td style={{ padding: '15px' }}>
                                                <span style={{
                                                    padding: '5px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    background: getStatusColor(order.status) + '20',
                                                    color: getStatusColor(order.status)
                                                }}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '15px', fontSize: '12px' }}>
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td style={{ padding: '15px' }}>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                                                        style={{
                                                            padding: '6px 10px',
                                                            border: '1px solid #e0e0e0',
                                                            borderRadius: '4px',
                                                            fontSize: '12px',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                    </select>
                                                    <button
                                                        onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
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
                                                        {expandedOrder === order.id ? 'Hide' : 'View'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        {expandedOrder === order.id && (
                                            <tr style={{ background: '#f9f9f9' }}>
                                                <td colSpan={8} style={{ padding: '20px' }}>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                                                        <div>
                                                            <h4 style={{ marginBottom: '15px' }}>Order Items</h4>
                                                            {order.items.map((item) => (
                                                                <div key={item.id} style={{
                                                                    display: 'flex',
                                                                    gap: '15px',
                                                                    marginBottom: '15px',
                                                                    padding: '10px',
                                                                    background: 'white',
                                                                    borderRadius: '6px'
                                                                }}>
                                                                    <img src={item.imageUrl} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                                                    <div style={{ flex: 1 }}>
                                                                        <strong>{item.name}</strong>
                                                                        <div style={{ fontSize: '12px', color: '#666' }}>{item.brand}</div>
                                                                        <div style={{ fontSize: '12px', marginTop: '5px' }}>
                                                                            Qty: {item.quantity} × Rs {item.price} = Rs {(parseFloat(item.price) * item.quantity).toFixed(2)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <div>
                                                            <h4 style={{ marginBottom: '15px' }}>Delivery Information</h4>
                                                            <div style={{ background: 'white', padding: '15px', borderRadius: '6px', marginBottom: '15px' }}>
                                                                <div style={{ marginBottom: '10px' }}>
                                                                    <strong>Address:</strong><br />
                                                                    {order.customerInfo.address}<br />
                                                                    {order.customerInfo.city}, {order.customerInfo.postalCode}
                                                                </div>
                                                            </div>

                                                            {order.customerInfo.notes && (
                                                                <div style={{ background: '#fffef0', padding: '15px', borderRadius: '6px' }}>
                                                                    <strong>Order Notes:</strong><br />
                                                                    <div style={{ marginTop: '5px', fontSize: '14px' }}>{order.customerInfo.notes}</div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </>
    );
}

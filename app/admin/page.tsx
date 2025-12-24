"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "@/app/context/OrderContext";
import Link from "next/link";

export default function AdminDashboard() {
    const router = useRouter();
    const { orders } = useOrder();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    // Admin email - in production, this should be in environment variables
    const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@cartify.com";

    useEffect(() => {
        const adminAuth = localStorage.getItem('adminAuth');
        if (adminAuth === ADMIN_EMAIL) {
            setIsAuthenticated(true);
        }
    }, [ADMIN_EMAIL]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (email === ADMIN_EMAIL) {
            localStorage.setItem('adminAuth', email);
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Unauthorized: Only admin email is allowed");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        setIsAuthenticated(false);
        setEmail("");
    };

    // Calculate statistics
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    if (!isAuthenticated) {
        return (
            <>
                <section id="page-header">
                    <h2>Admin Login</h2>
                    <p>Access restricted to authorized personnel</p>
                </section>

                <section className="section-p1" style={{ maxWidth: '400px', margin: '60px auto' }}>
                    <div style={{
                        background: 'white',
                        padding: '40px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Admin Access</h3>

                        <form onSubmit={handleLogin}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                    Admin Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: error ? '1px solid #e74c3c' : '1px solid #e0e0e0',
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}
                                    placeholder="Enter admin email"
                                />
                                {error && (
                                    <p style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px' }}>
                                        {error}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="normal"
                                style={{ width: '100%', padding: '12px' }}
                            >
                                Login
                            </button>
                        </form>

                        <p style={{ marginTop: '20px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
                            Authorized email: {ADMIN_EMAIL}
                        </p>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <section id="page-header">
                <h2>Admin Dashboard</h2>
                <p>Manage your orders and inventory</p>
            </section>

            <section className="section-p1">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h3>Welcome, Admin</h3>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '10px 20px',
                            background: '#e8653f',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        Logout
                    </button>
                </div>

                {/* Statistics Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    marginBottom: '40px'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #088178 0%, #065f57 100%)',
                        color: 'white',
                        padding: '30px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(8, 129, 120, 0.3)'
                    }}>
                        <div style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>Total Orders</div>
                        <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{totalOrders}</div>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, #e8653f 0%, #c74a27 100%)',
                        color: 'white',
                        padding: '30px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(232, 101, 63, 0.3)'
                    }}>
                        <div style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>Pending Orders</div>
                        <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{pendingOrders}</div>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, #27ae60 0%, #1e8449 100%)',
                        color: 'white',
                        padding: '30px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)'
                    }}>
                        <div style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>Total Revenue</div>
                        <div style={{ fontSize: '36px', fontWeight: 'bold' }}>Rs {totalRevenue.toFixed(2)}</div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px',
                    marginTop: '40px'
                }}>
                    <Link href="/admin/analytics" style={{ textDecoration: 'none' }}>
                        <div style={{
                            background: 'white',
                            padding: '40px',
                            borderRadius: '12px',
                            border: '2px solid #e0e0e0',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            color: '#088178'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#088178';
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(8, 129, 120, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#e0e0e0';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                            <i className="fa fa-chart-line" style={{ fontSize: '48px', marginBottom: '15px' }}></i>
                            <h3 style={{ margin: '10px 0', color: '#088178' }}>Analytics</h3>
                            <p style={{ color: '#666', margin: 0 }}>View sales insights and metrics</p>
                        </div>
                    </Link>

                    <Link href="/admin/orders" style={{ textDecoration: 'none' }}>
                        <div style={{
                            background: 'white',
                            padding: '40px',
                            borderRadius: '12px',
                            border: '2px solid #e0e0e0',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            color: '#088178'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#088178';
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(8, 129, 120, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#e0e0e0';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                            <i className="fa fa-shopping-bag" style={{ fontSize: '48px', marginBottom: '15px' }}></i>
                            <h3 style={{ margin: '10px 0', color: '#088178' }}>Orders Management</h3>
                            <p style={{ color: '#666', margin: 0 }}>View and manage all orders</p>
                        </div>
                    </Link>

                    <Link href="/admin/stock" style={{ textDecoration: 'none' }}>
                        <div style={{
                            background: 'white',
                            padding: '40px',
                            borderRadius: '12px',
                            border: '2px solid #e0e0e0',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            color: '#088178'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#088178';
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(8, 129, 120, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#e0e0e0';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                            <i className="fa fa-cubes" style={{ fontSize: '48px', marginBottom: '15px' }}></i>
                            <h3 style={{ margin: '10px 0', color: '#088178' }}>Stock Management</h3>
                            <p style={{ color: '#666', margin: 0 }}>Manage inventory levels</p>
                        </div>
                    </Link>
                </div>
            </section>
        </>
    );
}

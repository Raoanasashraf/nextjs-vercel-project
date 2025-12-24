"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "@/app/context/OrderContext";
import { products, gases } from "@/data/products";
import Link from "next/link";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export default function Analytics() {
    const router = useRouter();
    const { orders } = useOrder();
    const [timeRange, setTimeRange] = useState<7 | 30>(7);

    useEffect(() => {
        const adminAuth = localStorage.getItem('adminAuth');
        if (!adminAuth) {
            router.push('/admin');
        }
    }, [router]);

    const allProducts = useMemo(() => [...products, ...gases], []);

    // Calculate metrics
    const metrics = useMemo(() => {
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = orders.length;
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        // Find best selling product
        const productSales: Record<number, { name: string; quantity: number; revenue: number }> = {};
        orders.forEach(order => {
            order.items.forEach(item => {
                if (!productSales[item.id]) {
                    productSales[item.id] = { name: item.name, quantity: 0, revenue: 0 };
                }
                productSales[item.id].quantity += item.quantity;
                productSales[item.id].revenue += parseFloat(item.price) * item.quantity;
            });
        });

        const bestSeller = Object.entries(productSales).sort((a, b) => b[1].quantity - a[1].quantity)[0];

        return {
            totalRevenue,
            totalOrders,
            avgOrderValue,
            bestSellingProduct: bestSeller ? bestSeller[1].name : 'N/A'
        };
    }, [orders]);

    // Sales over time data
    const salesOverTimeData = useMemo(() => {
        const now = new Date();
        const daysAgo = timeRange;
        const labels: string[] = [];
        const salesData: number[] = [];

        for (let i = daysAgo - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));

            const dayOrders = orders.filter(order => {
                const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
                return orderDate === dateStr;
            });

            const dayRevenue = dayOrders.reduce((sum, order) => sum + order.total, 0);
            salesData.push(dayRevenue);
        }

        return {
            labels,
            datasets: [{
                label: 'Revenue (Rs)',
                data: salesData,
                borderColor: '#088178',
                backgroundColor: 'rgba(8, 129, 120, 0.1)',
                tension: 0.4,
                fill: true
            }]
        };
    }, [orders, timeRange]);

    // Order status distribution
    const statusDistributionData = useMemo(() => {
        const statusCounts = {
            Pending: 0,
            Processing: 0,
            Shipped: 0,
            Delivered: 0
        };

        orders.forEach(order => {
            statusCounts[order.status]++;
        });

        return {
            labels: ['Pending', 'Processing', 'Shipped', 'Delivered'],
            datasets: [{
                data: [statusCounts.Pending, statusCounts.Processing, statusCounts.Shipped, statusCounts.Delivered],
                backgroundColor: ['#e8653f', '#f39c12', '#3498db', '#27ae60'],
                borderWidth: 0
            }]
        };
    }, [orders]);

    // Top products
    const topProductsData = useMemo(() => {
        const productSales: Record<number, { name: string; quantity: number }> = {};

        orders.forEach(order => {
            order.items.forEach(item => {
                if (!productSales[item.id]) {
                    productSales[item.id] = { name: item.name, quantity: 0 };
                }
                productSales[item.id].quantity += item.quantity;
            });
        });

        const topProducts = Object.entries(productSales)
            .sort((a, b) => b[1].quantity - a[1].quantity)
            .slice(0, 5);

        return {
            labels: topProducts.map(([_, data]) => data.name),
            datasets: [{
                label: 'Units Sold',
                data: topProducts.map(([_, data]) => data.quantity),
                backgroundColor: '#088178',
                borderRadius: 8
            }]
        };
    }, [orders]);

    // Revenue by category
    const categoryRevenueData = useMemo(() => {
        const categoryRevenue = { stove: 0, gas: 0 };

        orders.forEach(order => {
            order.items.forEach(item => {
                const product = allProducts.find(p => p.id === item.id);
                if (product) {
                    categoryRevenue[product.category] += parseFloat(item.price) * item.quantity;
                }
            });
        });

        return {
            labels: ['Stoves', 'Gas & Accessories'],
            datasets: [{
                data: [categoryRevenue.stove, categoryRevenue.gas],
                backgroundColor: ['#088178', '#3498db'],
                borderWidth: 0
            }]
        };
    }, [orders, allProducts]);

    // Recent activity
    const recentOrders = useMemo(() => {
        return [...orders]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5);
    }, [orders]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const
            }
        }
    };

    return (
        <>
            <section id="page-header">
                <h2>Analytics Dashboard</h2>
                <p>Sales insights and performance metrics</p>
            </section>

            <section className="section-p1">
                <div style={{ marginBottom: '30px' }}>
                    <Link href="/admin" style={{ textDecoration: 'none', color: '#088178' }}>
                        ← Back to Dashboard
                    </Link>
                </div>

                {/* Overview Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    marginBottom: '40px'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #27ae60 0%, #1e8449 100%)',
                        color: 'white',
                        padding: '30px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)'
                    }}>
                        <div style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>Total Revenue</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold' }}>Rs {metrics.totalRevenue.toFixed(2)}</div>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, #088178 0%, #065f57 100%)',
                        color: 'white',
                        padding: '30px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(8, 129, 120, 0.3)'
                    }}>
                        <div style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>Total Orders</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{metrics.totalOrders}</div>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                        color: 'white',
                        padding: '30px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(52, 152, 219, 0.3)'
                    }}>
                        <div style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>Avg Order Value</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold' }}>Rs {metrics.avgOrderValue.toFixed(2)}</div>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, #f39c12 0%, #d68910 100%)',
                        color: 'white',
                        padding: '30px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(243, 156, 18, 0.3)'
                    }}>
                        <div style={{
                            fontSize: '14px', marginBottom: '10px', opacity: 0.9' }}>Best Seller</div>
                                <div style = {{ fontSize: '18px', fontWeight: 'bold' }}>{metrics.bestSellingProduct}</div>
                </div>
            </div>

            {/* Charts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                {/* Sales Over Time */}
                <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0 }}>Sales Over Time</h3>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(Number(e.target.value) as 7 | 30)}
                            style={{
                                padding: '8px 12px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '6px',
                                fontSize: '14px',
                                cursor: 'pointer'
                            }}
                        >
                            <option value={7}>Last 7 Days</option>
                            <option value={30}>Last 30 Days</option>
                        </select>
                    </div>
                    <div style={{ height: '300px' }}>
                        <Line data={salesOverTimeData} options={chartOptions} />
                    </div>
                </div>

                {/* Top Products */}
                <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ marginBottom: '20px' }}>Top 5 Products</h3>
                    <div style={{ height: '300px' }}>
                        <Bar data={topProductsData} options={chartOptions} />
                    </div>
                </div>

                {/* Order Status Distribution */}
                <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ marginBottom: '20px' }}>Order Status Distribution</h3>
                    <div style={{ height: '300px' }}>
                        <Pie data={statusDistributionData} options={chartOptions} />
                    </div>
                </div>

                {/* Revenue by Category */}
                <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ marginBottom: '20px' }}>Revenue by Category</h3>
                    <div style={{ height: '300px' }}>
                        <Pie data={categoryRevenueData} options={chartOptions} />
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h3 style={{ marginBottom: '20px' }}>Recent Orders</h3>
                {recentOrders.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#999', padding: '40px' }}>No orders yet</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                                    <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Order #</th>
                                    <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Customer</th>
                                    <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Amount</th>
                                    <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Status</th>
                                    <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map(order => (
                                    <tr key={order.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                        <td style={{ padding: '12px' }}>{order.orderNumber}</td>
                                        <td style={{ padding: '12px' }}>{order.customerInfo.name}</td>
                                        <td style={{ padding: '12px', fontWeight: 'bold', color: '#088178' }}>Rs {order.total.toFixed(2)}</td>
                                        <td style={{ padding: '12px' }}>
                                            <span style={{
                                                padding: '4px 10px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                background: order.status === 'Delivered' ? '#27ae6020' : '#e8653f20',
                                                color: order.status === 'Delivered' ? '#27ae60' : '#e8653f'
                                            }}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px', color: '#666', fontSize: '14px' }}>
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section >
        </>
    );
}

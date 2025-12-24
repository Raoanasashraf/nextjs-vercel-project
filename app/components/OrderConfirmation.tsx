"use client";

import { useOrder } from "@/app/context/OrderContext";

interface OrderConfirmationProps {
    orderId: string;
    orderNumber: string;
    onClose: () => void;
}

export default function OrderConfirmation({ orderId, orderNumber, onClose }: OrderConfirmationProps) {
    const { getOrderById } = useOrder();
    const order = getOrderById(orderId);

    if (!order) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '40px',
                maxWidth: '600px',
                width: '100%',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                animation: 'slideIn 0.3s ease-out'
            }}>
                {/* Success Icon */}
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: '#088178',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    color: 'white',
                    fontSize: '40px'
                }}>
                    ✓
                </div>

                <h2 style={{ textAlign: 'center', color: '#088178', marginBottom: '10px' }}>
                    Order Placed Successfully!
                </h2>

                <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
                    Thank you for your order. We've received it and will process it soon.
                </p>

                {/* Order Details */}
                <div style={{
                    background: '#f9f9f9',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '30px'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div>
                            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Order Number</p>
                            <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', fontSize: '16px' }}>{orderNumber}</p>
                        </div>
                        <div>
                            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Total Amount</p>
                            <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', fontSize: '16px', color: '#088178' }}>
                                Rs {order.total.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '15px' }}>
                        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Delivery Address</p>
                        <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                            {order.customerInfo.address}, {order.customerInfo.city}, {order.customerInfo.postalCode}
                        </p>
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Contact</p>
                        <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                            {order.customerInfo.email}
                        </p>
                        <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                            {order.customerInfo.phone}
                        </p>
                    </div>
                </div>

                {/* Estimated Delivery */}
                <div style={{
                    textAlign: 'center',
                    background: '#e8f8f5',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '30px'
                }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#088178', fontWeight: '600' }}>
                        <i className="fa fa-truck" style={{ marginRight: '8px' }}></i>
                        Estimated Delivery: 3-5 Business Days
                    </p>
                </div>

                {/* Order Items Summary */}
                <div style={{ marginBottom: '30px' }}>
                    <h4 style={{ marginBottom: '15px', fontSize: '16px' }}>Items({order.items.length}):</h4>
                    {order.items.slice(0, 3).map((item) => (
                        <div key={item.id} style={{
                            display: 'flex',
                            gap: '10px',
                            marginBottom: '10px',
                            fontSize: '14px'
                        }}>
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                            <div style={{ flex: 1 }}>
                                <p style={{ margin: 0, fontWeight: '500' }}>{item.name}</p>
                                <p style={{ margin: '2px 0 0 0', color: '#666', fontSize: '12px' }}>Qty: {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                    {order.items.length > 3 && (
                        <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                            + {order.items.length - 3} more item(s)
                        </p>
                    )}
                </div>

                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={onClose}
                        className="normal"
                        style={{
                            padding: '12px 40px',
                            fontSize: '16px'
                        }}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideIn {
                    from {
                        transform: translateY(-50px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}

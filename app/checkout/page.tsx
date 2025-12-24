"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useOrder, CustomerInfo } from "@/app/context/OrderContext";
import OrderConfirmation from "@/app/components/OrderConfirmation";

export default function Checkout() {
    const router = useRouter();
    const { cart, clearCart, getTotalPrice } = useCart();
    const { addOrder } = useOrder();

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [orderNumber, setOrderNumber] = useState("");

    const [formData, setFormData] = useState<CustomerInfo>({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        notes: ""
    });

    const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<CustomerInfo> = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone is required";
        } else if (!/^\d{10,}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
            newErrors.phone = "Phone must be at least 10 digits";
        }
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof CustomerInfo]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        try {
            const orderItems = cart.map(item => ({
                id: item.id,
                name: item.name,
                brand: item.brand,
                price: item.price,
                imageUrl: item.imageUrl,
                quantity: item.quantity
            }));

            const newOrderId = await addOrder({
                items: orderItems,
                customerInfo: formData,
                total: getTotalPrice()
            });

            // Get the order to access order number
            const createdOrder = JSON.parse(localStorage.getItem('orders') || '[]')
                .find((order: any) => order.id === newOrderId);

            setOrderId(newOrderId);
            setOrderNumber(createdOrder?.orderNumber || '');
            setShowConfirmation(true);
            clearCart();
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        }
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
        router.push('/');
    };

    if (cart.length === 0 && !showConfirmation) {
        return (
            <>
                <section id="page-header">
                    <h2>Checkout</h2>
                    <p>Complete your purchase</p>
                </section>
                <section className="section-p1" style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <h3>Your cart is empty</h3>
                    <p>Add items to your cart before proceeding to checkout</p>
                    <button
                        className="normal"
                        onClick={() => router.push('/shop')}
                        style={{ marginTop: '20px' }}
                    >
                        Go to Shop
                    </button>
                </section>
            </>
        );
    }

    return (
        <>
            <section id="page-header">
                <h2>Checkout</h2>
                <p>Complete your purchase</p>
            </section>

            <section className="section-p1" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                    {/* Order Summary */}
                    <div>
                        <h3>Order Summary</h3>
                        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', marginTop: '20px' }}>
                            {cart.map((item) => (
                                <div key={item.id} style={{ display: 'flex', gap: '15px', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #f0f0f0' }}>
                                    <img src={item.imageUrl} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                    <div style={{ flex: 1 }}>
                                        <h6 style={{ margin: '0 0 5px 0' }}>{item.name}</h6>
                                        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{item.brand}</p>
                                        <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>Qty: {item.quantity}</p>
                                    </div>
                                    <div style={{ fontWeight: 'bold' }}>Rs {(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
                                </div>
                            ))}
                            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #e0e0e0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span>Subtotal:</span>
                                    <span>Rs {getTotalPrice().toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span>Shipping:</span>
                                    <span>Free</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', marginTop: '15px' }}>
                                    <span>Total:</span>
                                    <span style={{ color: '#088178' }}>Rs {getTotalPrice().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Information Form */}
                    <div>
                        <h3>Delivery Information</h3>
                        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: errors.name ? '1px solid #e74c3c' : '1px solid #e0e0e0',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}
                                    placeholder="Enter your full name"
                                />
                                {errors.name && <span style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.name}</span>}
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: errors.email ? '1px solid #e74c3c' : '1px solid #e0e0e0',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}
                                    placeholder="your.email@example.com"
                                />
                                {errors.email && <span style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.email}</span>}
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: errors.phone ? '1px solid #e74c3c' : '1px solid #e0e0e0',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}
                                    placeholder="03XX-XXXXXXX"
                                />
                                {errors.phone && <span style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.phone}</span>}
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Delivery Address *</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: errors.address ? '1px solid #e74c3c' : '1px solid #e0e0e0',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}
                                    placeholder="Street address, House number"
                                />
                                {errors.address && <span style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.address}</span>}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            border: errors.city ? '1px solid #e74c3c' : '1px solid #e0e0e0',
                                            borderRadius: '4px',
                                            fontSize: '14px'
                                        }}
                                        placeholder="City"
                                    />
                                    {errors.city && <span style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.city}</span>}
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Postal Code *</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            border: errors.postalCode ? '1px solid #e74c3c' : '1px solid #e0e0e0',
                                            borderRadius: '4px',
                                            fontSize: '14px'
                                        }}
                                        placeholder="Postal Code"
                                    />
                                    {errors.postalCode && <span style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.postalCode}</span>}
                                </div>
                            </div>

                            <div style={{ marginBottom: '30px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Order Notes (Optional)</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={4}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        resize: 'vertical'
                                    }}
                                    placeholder="Any special instructions for your order?"
                                />
                            </div>

                            <button
                                type="submit"
                                className="normal"
                                style={{ width: '100%', padding: '15px', fontSize: '16px' }}
                            >
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {showConfirmation && (
                <OrderConfirmation
                    orderId={orderId}
                    orderNumber={orderNumber}
                    onClose={handleCloseConfirmation}
                />
            )}
        </>
    );
}

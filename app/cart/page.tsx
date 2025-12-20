"use client";

import { useCart } from "@/app/context/CartContext";
import Newsletter from "@/app/components/Newsletter";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Cart() {
    const { cart, removeFromCart } = useCart();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const calculateSubtotal = () => {
        // Assuming price is "0" for now as per data, but logic is here
        // If we had real prices: parseFloat(item.price) * item.quantity
        return cart.reduce((total, item) => total + (parseFloat(item.price) || 0) * item.quantity, 0);
    };

    if (!isClient) return null; // Prevent hydration mismatch

    return (
        <>
            <section id="page-header" className="cart-header">
                <h2>#cart</h2>
                <p>Add your coupon code & SAVE upto 70%!</p>
            </section>

            <section id="cart" className="section-p1">
                <table width="100%">
                    <thead>
                        <tr>
                            <td>Remove</td>
                            <td>Image</td>
                            <td>Product</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Subtotal</td>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>Your cart is empty. <Link href="/shop" style={{ color: "#088178" }}>Go Shopping</Link></td>
                            </tr>
                        ) : (
                            cart.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <a href="#" onClick={(e) => { e.preventDefault(); removeFromCart(item.id); }}>
                                            <i className="far fa-times-circle"></i>
                                        </a>
                                    </td>
                                    <td>
                                        <Image src={item.imageUrl} alt={item.name} width={70} height={70} />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>Rs {item.price}</td>
                                    <td>
                                        <input type="number" value={item.quantity} readOnly />
                                    </td>
                                    <td>Rs {(parseFloat(item.price) || 0) * item.quantity}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>

            <section id="cart-add" className="section-p1">
                <div id="coupon">
                    <h3>Apply Coupon</h3>
                    <div>
                        <input type="text" placeholder="Enter Your Coupon" />
                        <button className="normal">Apply</button>
                    </div>
                </div>
                <div id="subtotal">
                    <h3>Cart Totals</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>Cart Subtotal</td>
                                <td>Rs {calculateSubtotal()}</td>
                            </tr>
                            <tr>
                                <td>Shipping</td>
                                <td>Free</td>
                            </tr>
                            <tr>
                                <td><strong>Total</strong></td>
                                <td><strong>Rs {calculateSubtotal()}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="normal">Proceed to checkout</button>
                </div>
            </section>

            <Newsletter />
        </>
    );
}

"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
    const { getCartItemCount } = useCart();
    const cartCount = getCartItemCount();

    const [isActive, setIsActive] = useState(false);

    return (
        <section id="header">
            <Link href="/">
                <Image src="/image/logo.png" className="logo" alt="logo" width={80} height={80} />
            </Link>

            <div>
                <ul id="navbar" className={isActive ? "active" : ""}>
                    <li>
                        <Link className="active" href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop">Shop</Link>
                    </li>
                    <li>
                        <Link href="/about">About us</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact us</Link>
                    </li>
                    <li>
                        <Link href="/orders">My Orders</Link>
                    </li>
                    <li id="lg-bag">
                        <Link href="/cart" style={{ position: 'relative', display: 'inline-block' }}>
                            <i className="fa fa-shopping-cart cart" aria-hidden="true"></i>
                            {cartCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    background: '#e8653f',
                                    color: 'white',
                                    borderRadius: '50%',
                                    padding: '2px 6px',
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    minWidth: '18px',
                                    height: '18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </li>
                    <a href="#" id="close" onClick={(e) => { e.preventDefault(); setIsActive(false); }}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </a>
                </ul>
            </div>

            <div id="mobile">
                <Link href="/cart" style={{ position: 'relative', display: 'inline-block' }}>
                    <i className="fa fa-shopping-cart cart"></i>
                    {cartCount > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: '#e8653f',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '2px 6px',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            minWidth: '18px',
                            height: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {cartCount}
                        </span>
                    )}
                </Link>
                <i
                    id="bar"
                    className="fa fa-outdent"
                    onClick={() => setIsActive(!isActive)}
                ></i>
            </div>
        </section>
    );
}

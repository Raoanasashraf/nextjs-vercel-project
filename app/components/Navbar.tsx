"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
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
                    <li id="lg-bag">
                        <Link href="/cart">
                            <i className="fa fa-shopping-cart cart" aria-hidden="true"></i>
                        </Link>
                    </li>
                    <a href="#" id="close" onClick={(e) => { e.preventDefault(); setIsActive(false); }}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </a>
                </ul>
            </div>

            <div id="mobile">
                <Link href="/cart">
                    <i className="fa fa-shopping-cart cart"></i>
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

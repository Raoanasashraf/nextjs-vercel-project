"use client";

import Link from "next/link";

export default function Hero() {
    return (
        <section id="hero">
            <h4>Trade in gas </h4>
            <h2>Super value deals</h2>
            <h1> On all products</h1>

            <p>
                Reliable Cooking Gas.Safe,Fast, Affordable. Your trusted LPG supplier
                for homes and businesses.
            </p>
            <Link href="/shop">
                <button className="btn">Shop now</button>
            </Link>
        </section>
    );
}

"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/app/context/CartContext";

export default function StoreProduct({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <div className="pro">
            <Link href={`/product/${product.id}`}>
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={200}
                    height={200}
                    style={{ display: "flex", margin: "0 auto" }}
                />
                <div className="des">
                    <span
                        style={{
                            textAlign: "left",
                            color: "#606063",
                            fontSize: "14px",
                        }}
                    >
                        {product.brand}
                    </span>
                    <h5 style={{ textAlign: "start", fontSize: "15px", fontWeight: 700 }}>
                        {product.name}
                    </h5>
                    <div className="star" style={{ textAlign: "start" }}>
                        {[...Array(product.rating)].map((_, i) => (
                            <i
                                key={i}
                                className="fas fa-star"
                                style={{ fontSize: "12px", color: "rgba(243,181,25)" }}
                            ></i>
                        ))}
                    </div>
                    <h4
                        style={{
                            paddingTop: "7px",
                            textAlign: "start",
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "#088178",
                        }}
                    >
                        Rs {product.price}
                    </h4>
                </div>
            </Link>
            <a href="#" onClick={(e) => {
                e.preventDefault();
                addToCart(product);
                // Optional: visual feedback
            }}>
                <i
                    className="fa fa-shopping-cart cart"
                    style={{
                        width: "40px",
                        height: "40px",
                        lineHeight: "40px",
                        borderRadius: "50px",
                        backgroundColor: "#e8f6ea",
                        color: "#088178",
                        border: "1px solid #cce7d0",
                        position: "absolute",
                        bottom: "20px",
                        right: "10px",
                    }}
                ></i>
            </a>
        </div>
    );
}

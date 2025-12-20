"use client";

import Image from 'next/image';
import { Product } from '@/data/products';
import { useCart } from '@/app/context/CartContext';
import { useState } from 'react';

export default function ProductDetails({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    // Using placeholders for other images as in the original HTML
    const [mainImage, setMainImage] = useState(product.imageUrl);

    const images = [
        product.imageUrl, // main
        "/image/kenwoodTripleAuto.jpg",
        "/image/royalKingGlassTriple.jpg",
        "/image/sanyoAutoSteelTriple.jpg",
    ];

    return (
        <section id="prodetails" className="section-p1">
            <div className="single-pro-image" style={{ width: "40%", marginRight: "50px" }}>
                <Image
                    src={mainImage}
                    width={500}
                    height={400}
                    className="main-img"
                    id="MainImg"
                    alt={product.name}
                    style={{ width: "100%", objectFit: "contain" }}
                />
                <div className="small-img-group">
                    {images.map((img, index) => (
                        <div className="small-img-col" key={index} onClick={() => setMainImage(img)}>
                            <Image
                                src={img}
                                width={100}
                                height={100}
                                className="small-img"
                                alt="product variation"
                                style={{ width: "100%" }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="single-pro-details" style={{ width: "50%", paddingTop: "30px" }}>
                <h6>Home / {product.category}</h6>
                <h4 style={{ fontWeight: 400 }}>{product.brand}</h4>
                <h2 style={{ fontWeight: 600 }}>{product.name}</h2>
                <h2 style={{ fontWeight: 600, color: '#088178' }}>Price: Rs {product.price === "0" ? "On Request" : product.price}</h2>

                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                    style={{ width: "50px", height: "47px", paddingLeft: "10px", fontSize: "16px", marginRight: "10px", border: "1px solid #000" }}
                />
                <button
                    className="normal"
                    onClick={() => addToCart(product, quantity)}
                >
                    Add to Cart
                </button>

                <h4 style={{ marginTop: "20px" }}>Product Details</h4>
                <span>
                    Three burners (often in large, medium, small sizes) allow simultaneous cooking of multiple dishes — ideal for families.
                    Toughened glass (6–8 mm thick) is common—durable, easy to clean, and adds visual appeal.
                    Brass burners offer better heat distribution and durability.
                    Anti-skid feet, sturdy pan supports, and spill trays enhance cooking safety and ease maintenance.
                </span>
            </div>
        </section>
    );
}

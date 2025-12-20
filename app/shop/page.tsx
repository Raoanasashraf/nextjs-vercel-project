import Link from "next/link";
import { products, gases } from "@/data/products";
import StoreProduct from "@/app/components/StoreProduct";
import Newsletter from "@/app/components/Newsletter";

export default function Shop() {
    const allProducts = [...products, ...gases];

    return (
        <>
            <section id="page-header">
                <h2>#Stay Home</h2>
        
            </section>

            <section id="product1" className="section-p1">
                <h2 style={{ paddingTop: "10px" }}>Feature Products</h2>
                <p>All Gas Appliances </p>
                <div
                    className="pro-container"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "20px",
                        flexWrap: "wrap",
                    }}
                >
                    {products.map((product) => (
                        <StoreProduct key={product.id} product={product} />
                    ))}
                </div>
            </section>

            <section id="product1">
                <div><h2 style={{ fontWeight: 500 }}>Available Gases</h2></div>
                <div className="pro-container" style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px', flexWrap: 'wrap' }}>
                    {gases.map((product) => (
                        <StoreProduct key={product.id} product={product} />
                    ))}
                </div>
            </section>

            <Newsletter />
        </>
    );
}

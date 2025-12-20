import { products, gases, Product } from '@/data/products';
import StoreProduct from '@/app/components/StoreProduct';
import ProductDetails from '@/app/components/ProductDetails';
import Newsletter from '@/app/components/Newsletter';

export function generateStaticParams() {
    const allProducts = [...products, ...gases];
    return allProducts.map((product) => ({
        id: product.id.toString(),
    }));
}

export default async function ProductMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    // Combine arrays to search
    const allProducts = [...products, ...gases];
    const product = allProducts.find((p) => p.id === parseInt(id));

    if (!product) {
        return (
            <div style={{ textAlign: "center", padding: "50px" }}>
                <h2>Product Not Found</h2>
            </div>
        );
    }

    // Filter related products (same category, excluding current)
    const relatedProducts = allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <>
            <ProductDetails product={product} />

            <section id="product1" className="section-p1">
                <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Related Products</h2>
                <div className="pro-container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {relatedProducts.map(p => (
                        <StoreProduct key={p.id} product={p} />
                    ))}
                </div>
            </section>

            <Newsletter />
        </>
    );
}

import { NextResponse } from 'next/server';
import { products, gases, Product } from '@/data/products';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const allProducts: Product[] = [...products, ...gases];
    const productId = parseInt(id);
    const product = allProducts.find((p) => p.id === productId);

    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
}

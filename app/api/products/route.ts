import { NextResponse } from 'next/server';
import { products, gases } from '@/data/products';

export async function GET() {
    const allProducts = [...products, ...gases];
    return NextResponse.json(allProducts);
}

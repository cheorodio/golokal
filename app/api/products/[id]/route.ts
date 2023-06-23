import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteProductsById,
  getProductsById,
  updateProductById,
} from '../../../../database/products';
import { Product } from '../../../../migrations/1687505841-createTableProducts';

export type Error = {
  error: string;
};

type ProductResponseBodyGet = { product: Product } | Error;
type ProductResponseBodyPut = { product: Product } | Error;
type ProductResponseBodyDelete = { product: Product } | Error;

const productSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  // productImageId: z.number(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<ProductResponseBodyGet>> {
  const productId = Number(params.productId);

  if (!productId) {
    return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
  }
  // query the database to get all the products
  const product = await getProductsById(productId);

  if (!product) {
    return NextResponse.json({ error: 'Product Not Found' }, { status: 404 });
  }

  return NextResponse.json({ product: product });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<ProductResponseBodyPut>> {
  const productId = Number(params.productId);
  const body = await request.json();

  if (!productId) {
    return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
  }

  // zod please verify the body matches my schema
  const result = productSchema.safeParse(body);

  if (!result.success) {
    // zod send you details about the error
    return NextResponse.json(
      { error: 'The data is incomplete' },
      { status: 400 },
    );
  }
  // query the database to update the product
  const productToUpdate = await updateProductById(
    productId,
    result.data.name,
    result.data.category,
    result.data.description,
    // result.data.productImageId,
  );

  if (!productToUpdate) {
    return NextResponse.json({ error: 'Product Not Found' }, { status: 404 });
  }

  return NextResponse.json({
    product: productToUpdate,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<ProductResponseBodyDelete>> {
  const productId = Number(params.productId);

  if (!productId) {
    return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
  }
  // query the database to get all the products
  const allProducts = await deleteProductsById(productId);
  if (!allProducts) {
    return NextResponse.json({ error: 'Product Not Found' }, { status: 404 });
  }

  return NextResponse.json({ product: allProducts });
}

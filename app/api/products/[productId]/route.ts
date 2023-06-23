import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteProductsById,
  updateProductById,
} from '../../../../database/products';
import { Product } from '../../../../migrations/1687505841-createTableProducts';

type ProductResponseBodyPut = { product: Product } | Error;
type ProductResponseBodyDelete = { product: Product } | Error;

const productSchema = z.object({
  name: z.string(),
  categoryId: z.number(),
  description: z.string(),
  productImageId: z.number(),
});

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
  const product = await updateProductById(
    productId,
    result.data.name,
    result.data.categoryId,
    result.data.description,
    result.data.productImageId,
  );

  if (!product) {
    return NextResponse.json({ error: 'Product Not Found' }, { status: 404 });
  }

  return NextResponse.json({
    product: product,
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
  const product = await deleteProductsById(productId);
  if (!product) {
    return NextResponse.json({ error: 'Product Not Found' }, { status: 404 });
  }

  return NextResponse.json({ product: product });
}

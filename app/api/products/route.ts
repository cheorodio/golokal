import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createProduct } from '../../../database/products';
import { getUserBySessionToken } from '../../../database/users';
import { Product } from '../../../migrations/1688217286-createTableProducts';

type Error = {
  error: string;
};

export type ProductsResponseBodyPost = { product: Product } | Error;

const productSchema = z.object({
  userId: z.number(),
  shopId: z.number(),
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().min(1),
});

// CREATING PRODUCTS //////////////////////////////////
export async function POST(
  request: NextRequest,
): Promise<NextResponse<ProductsResponseBodyPost>> {
  const token = cookies().get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({
      errors: [{ message: 'Invalid session token' }],
    });
  }
  const body = await request.json();
  const result = productSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'The data is incomplete' },
      { status: 400 },
    );
  }

  const newProduct = await createProduct(
    result.data.userId,
    result.data.shopId,
    result.data.name,
    result.data.category,
    result.data.description,
    result.data.imageUrl,
  );

  if (!newProduct) {
    return NextResponse.json(
      { error: 'Error creating new product' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    product: newProduct,
  });
}

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createProduct,
  getProductsWithLimitAndOffsetBySessionToken,
} from '../../../database/products';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserBySessionToken } from '../../../database/users';
import { Product } from '../../../migrations/1688118721-createProducts';

type Error = {
  error: string;
};

type ProductsResponseBodyGet = { product: Product } | Error;
type ProductsResponseBodyPost = { product: Product } | Error;

const productSchema = z.object({
  userId: z.number(),
  shopId: z.number(),
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().optional(),
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
      { errors: [{ message: 'Invalid' }] },
      { status: 400 },
    );
  }
  // query the database to get all the products
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

// // get all the products
export async function GET(
  request: NextRequest,
): Promise<NextResponse<ProductsResponseBodyGet>> {
  const { searchParams } = new URL(request.url);

  // 1. get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the token has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const limit = Number(searchParams.get('limit'));
  const offset = Number(searchParams.get('offset'));

  if (!limit || !offset) {
    return NextResponse.json(
      { error: 'Limit and Offset need to be passed as params' },
      { status: 400 },
    );
  }

  // query the database to get all the products only if a valid session token is passed
  const allProducts = await getProductsWithLimitAndOffsetBySessionToken(
    limit,
    offset,
    sessionTokenCookie.value,
  );

  return NextResponse.json({ product: allProducts });
}

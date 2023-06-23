import { cookies } from 'next/headers';
// import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createProduct,
  getProductsWithLimitAndOffsetBySessionToken,
} from '../../../database/products';
import { getValidSessionByToken } from '../../../database/sessions';
// import { getValidSessionByToken } from '../../../database/sessions';
import { Product } from '../../../migrations/1687505841-createTableProducts';

type Error = {
  error: string;
};

type ProductsResponseBodyGet = { product: Product } | Error;
type ProductsResponseBodyPost = { product: Product } | Error;

const productSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  // productImageId: z.number(),
});

// get all the products
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

// CREATING PRODUCTS //////////////////////////////////
export async function POST(
  request: NextRequest,
): Promise<NextResponse<ProductsResponseBodyPost>> {
  const body = await request.json();

  // zod please verify the body matches my schema
  const result = productSchema.safeParse(body);

  if (!result.success) {
    // zod send you details about the error
    return NextResponse.json(
      { error: 'The data is incomplete' },
      { status: 400 },
    );
  }
  // query the database to get all the products
  const newProduct = await createProduct(
    result.data.name,
    result.data.category,
    result.data.description,
    // result.data.productImageId,
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

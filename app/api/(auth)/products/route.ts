import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createProduct,
  getProductsWithLimitAndOffsetBySessionToken,
} from '../../../../database/products';
import { getValidSessionByToken } from '../../../../database/sessions';
import { Product } from '../../../../migrations/1687183921-createProductsTable';

export type Error = {
  error: string;
};

type ProductsResponseBodyGet = { product: Product[] } | Error;
type ProductsResponseBodyPost = { product: Product } | Error;

const productSchema = z.object({
  name: z.string(),
  productType: z.string(),
  category: z.string(),
  description: z.string(),
});

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
    return NextResponse.json(
      {
        error: 'session token is not valid',
      },
      { status: 401 },
    );
  }

  const limit = Number(searchParams.get('limit'));
  const offset = Number(searchParams.get('offset'));

  if (!limit || !offset) {
    return NextResponse.json(
      {
        error: 'Limit and Offset need to be passed as params',
      },
      { status: 400 },
    );
  }

  // query the database to get all the animals only if a valid session token is passed
  const products = await getProductsWithLimitAndOffsetBySessionToken(
    limit,
    offset,
    sessionTokenCookie.value,
  );

  return NextResponse.json({ products: products });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ProductsResponseBodyPost>> {
  const body = await request.json();

  // zod please verify the body matches my schema
  const result = productSchema.safeParse(body);

  if (!result.success) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }
  // query the database to get all the animals
  const product = await createProduct(
    result.data.name,
    result.data.productType,
    result.data.category,
    result.data.description,
  );

  if (!product) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'Error creating the new animal',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    product: product,
  });
}

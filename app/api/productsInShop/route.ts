import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createProductsInShop } from '../../../database/productsInShop';
import { getUserBySessionToken } from '../../../database/users';
import { Favourite } from '../../../migrations/1688108322-createFavourites';

const productsInShopSchema = z.object({
  shopId: z.number(),
  productId: z.number(),
});

export type Error = {
  error: string;
};

export type ProductsInShopsResponseBodyPost =
  | { favourites: Favourite[] }
  | Error;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ProductsInShopsResponseBodyPost>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({
      errors: [{ message: 'Invalid session token' }],
    });
  }

  const body = await request.json();
  const result = productsInShopSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: [{ message: 'Invalid' }] },
      { status: 400 },
    );
  }

  const newProductsInShop = await createProductsInShop(
    result.data.shopId,
    result.data.productId,
  );

  if (!newProductsInShop) {
    return NextResponse.json(
      { errors: [{ message: 'Products not created!' }] },
      { status: 500 },
    );
  }
  return NextResponse.json({ productInShop: newProductsInShop });
}

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createFavourites } from '../../../database/favourites';
import { getProductsWithLimitAndOffsetBySessionToken } from '../../../database/products';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserBySessionToken } from '../../../database/users';
import { Favourite } from '../../../migrations/1687958140-createFavourites';

const favouritesSchema = z.object({
  userId: z.number(),
  shopId: z.number(),
});

export type Error = {
  error: string;
};

type FavouritesResponseBodyGet = { favourites: Favourite } | Error;
type FavouritesResponseBodyPost = { favourites: Favourite } | Error;

export async function GET(
  request: NextRequest,
): Promise<NextResponse<FavouritesResponseBodyGet>> {
  const { searchParams } = new URL(request.url);
  const sessionTokenCookie = cookies().get('sessionToken');
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

  const allFavourites = await getProductsWithLimitAndOffsetBySessionToken(
    limit,
    offset,
    sessionTokenCookie.value,
  );

  return NextResponse.json({ product: allFavourites });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<FavouritesResponseBodyPost>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({
      errors: [{ message: 'Invalid session token' }],
    });
  }

  const body = await request.json();
  const result = favouritesSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: [{ message: 'Invalid' }] },
      { status: 400 },
    );
  }

  const newFavouriteShop = await createFavourites(user.id, result.data.shopId);

  if (!newFavouriteShop) {
    return NextResponse.json(
      { errors: [{ message: 'Attendance not created!' }] },
      { status: 500 },
    );
  }
  return NextResponse.json({ favourite: newFavouriteShop });
}

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createFavourite } from '../../../database/favourites';
import { getUserBySessionToken } from '../../../database/users';
import { Favourite } from '../../../migrations/1688217261-createTableFavourites';

const favouritesSchema = z.object({
  userId: z.number(),
  shopId: z.number(),
});

export type Error = {
  error: string;
};

export type FavouritesResponseBodyPost = { favourites: Favourite } | Error;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<FavouritesResponseBodyPost>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({
      error: 'Invalid session token',
    });
  }

  const body = await request.json();
  const result = favouritesSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid' }, { status: 400 });
  }

  const newFavouriteShop = await createFavourite(
    result.data.userId,
    result.data.shopId,
  );

  if (!newFavouriteShop) {
    return NextResponse.json(
      { error: 'Favourite not created!' },
      { status: 500 },
    );
  }
  return NextResponse.json({ favourites: newFavouriteShop });
}

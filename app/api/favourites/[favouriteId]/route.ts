import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { deleteFavouriteById } from '../../../../database/favourites';
import { getUserBySessionToken } from '../../../../database/users';
import { Favourite } from '../../../../migrations/1687958140-createTableFavourites';
import { Error } from '../route';

type FavouritesResponseBodyDelete = { favourite: Favourite } | Error;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<FavouritesResponseBodyDelete>> {
  const token = cookies().get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'Invalid Session Token' });
  }

  const favouriteId = Number(params.favouriteId);

  if (!favouriteId) {
    return NextResponse.json(
      {
        error: 'Invalid Favourite Id',
      },
      { status: 400 },
    );
  }

  const favourite = await deleteFavouriteById(favouriteId);

  if (!favourite) {
    return NextResponse.json(
      {
        error: 'Favourite not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ favourite: favourite });
}

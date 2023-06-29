import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createImage } from '../../../database/images';
import { getUserBySessionToken } from '../../../database/users';
import { Image } from '../../../migrations/1688032335-createImages';

const favouritesSchema = z.object({
  userId: z.number(),
  shopId: z.number(),
  imageUrl: z.string(),
});

export type Error = {
  error: string;
};

export type ImagesResponseBodyPost = { images: Image[] } | Error;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ImagesResponseBodyPost>> {
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

  const newFavouriteShop = await createImage(
    result.data.userId,
    result.data.shopId,
    result.data.imageUrl,
  );

  if (!newFavouriteShop) {
    return NextResponse.json(
      { errors: [{ message: 'Image not created!' }] },
      { status: 500 },
    );
  }
  return NextResponse.json({ favourite: newFavouriteShop });
}

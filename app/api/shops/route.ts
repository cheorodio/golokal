import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../database/sessions';
import { createShop } from '../../../database/shops';
import { getUserBySessionToken } from '../../../database/users';
import { secureCookieOptions } from '../../util/cookies';

export type Error = {
  error: string;
};

export type CreateShopResponseBodyPost =
  | {
      shop: {
        name: string;
        description: string;
        websiteUrl: string;
        location: string;
        imageUrl: string;
        userId: number;
      };
    }
  | Error;

const shopSchema = z.object({
  name: z.string(),
  description: z.string(),
  websiteUrl: z.string(),
  location: z.string(),
  imageUrl: z.string(),
  userId: z.number(),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateShopResponseBodyPost>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  const user = token && (await getUserBySessionToken(token.value));
  if (!user) {
    return NextResponse.json({ error: 'User not found' });
  }

  const body = await request.json();

  // get credentials from the body
  const result = shopSchema.safeParse(body);

  // verify the user data and check that the name is not taken
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Some information are missing, please complete form',
      },
      { status: 400 },
    );
  }

  // store credentials in the DB
  const newShop = await createShop(
    result.data.name,
    result.data.description,
    result.data.websiteUrl,
    result.data.location,
    result.data.imageUrl,
    result.data.userId,
  );

  if (!newShop) {
    // zod send you details about the error
    return NextResponse.json(
      {
        error: 'Error creating the new shop',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ shop: newShop });
}

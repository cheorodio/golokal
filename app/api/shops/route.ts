import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../database/sessions';
import { createShop, getShopByUsername } from '../../../database/shops';
import { secureCookieOptions } from '../../util/cookies';

export type Error = {
  error: string;
};

export type CreateShopResponseBodyPost =
  | {
      shop: {
        // username: string;
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
  // username: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  websiteUrl: z.string().min(1),
  location: z.string().min(1),
  imageUrl: z.string().min(1),
  userId: z.number().min(1),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateShopResponseBodyPost>> {
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

  // verify if the user is already taken
  if (await getShopByUsername(result.data.username)) {
    return NextResponse.json(
      {
        error: 'shop username is taken',
      },
      { status: 406 },
    );
  }

  // store credentials in the DB
  const newShop = await createShop(
    // result.data.username,
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

  // // We are sure the user is authenticated
  // // 5. Create a token
  // const token = crypto.randomBytes(100).toString('base64');
  // // 6. Create the session record

  // const session = await createSession(token, newShop.id);

  // if (!session) {
  //   return NextResponse.json(
  //     {
  //       error: 'Error creating the new session',
  //     },
  //     { status: 500 },
  //   );
  // }

  // // 7. Send the new cookie in the headers
  // cookies().set({
  //   name: 'sessionToken',
  //   value: session.token,
  //   ...secureCookieOptions,
  // });

  return NextResponse.json({ shop: newShop });
}

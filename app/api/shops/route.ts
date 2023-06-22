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
      shops: {
        id: number;
        username: number;
        name: string;
      };
    }
  | Error;

const shopSchema = z.object({
  username: z.string(),
  name: z.string(),
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
        error: 'shop usernamr or name is missing',
      },
      { status: 400 },
    );
  }

  // verify if the user is already taken
  // console.log(await getUserByUsername(result.data.username));
  if (await getShopByUsername(result.data.username)) {
    return NextResponse.json(
      {
        error: 'Username is taken',
      },
      { status: 406 },
    );
  }

  // hash the password
  // const passwordHash = await bcrypt.hash(result.data.password, 10);
  // console.log(passwordHash, result.data.password);
  // store credentials in the DB
  const newShop = await createShop(result.data.username);

  if (!newShop) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'Error creating the new shop',
      },
      { status: 500 },
    );
  }

  // We are sure the user is authenticated

  // 5. Create a token
  const token = crypto.randomBytes(100).toString('base64');
  // 6. Create the session record

  const session = await createSession(token, newShop.id);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Error creating the new session',
      },
      { status: 500 },
    );
  }

  // 7. Send the new cookie in the headers
  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  return NextResponse.json({ user: newShop });
}

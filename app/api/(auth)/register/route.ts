import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { creaateSession } from '../../../../database/sessions';
import { createUser, getUserByUsername, User } from '../../../../database/user';
import { secureCookieOptions } from '../../../util/cookies';

type Error = {
  error: string;
};
export type RegisterResponseBodyPost =
  | {
      user: User;
    }
  | Error;

//  z object to validate user data
const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  email: z.string().min(1),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  const body = await request.json();

  // get credentials from the body
  // console.log(body);
  const result = userSchema.safeParse(body);

  // verify the user data and check that the name is not taken
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Username, password or email is missing',
      },
      { status: 400 },
    );
  }

  // verify if the user is already taken
  // console.log(await getUserByUsername(result.data.username));
  if (await getUserByUsername(result.data.username)) {
    return NextResponse.json(
      {
        error: 'Username is taken',
      },
      { status: 406 },
    );
  }

  // hash the password
  const passwordHash = await bcrypt.hash(result.data.password, 10);
  // console.log(passwordHash, result.data.password);
  // store credentials in the DB
  const newUser = await createUser(
    result.data.username,
    result.data.email,
    passwordHash,
  );

  if (!newUser) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'Error creating the new user',
      },
      { status: 500 },
    );
  }

  // We are sure the user is authenticated

  // 5. Create a token
  const token = crypto.randomBytes(100).toString('base64');
  // 6. Create the session record

  const session = await creaateSession(token, newUser.id);

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

  return NextResponse.json({ user: newUser });
}

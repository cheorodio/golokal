import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/dist/client/components/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import { getUserWithPasswordHashByUsername } from '../../../../database/users';
import { secureCookieOptions } from '../../../../util/cookies';

type Error = {
  error: string;
};

export type LoginResponseBodyPost =
  | {
      user: { username: string; id: number };
    }
  | Error;

//  z object to validate user data
const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponseBodyPost>> {
  const body = await request.json();

  // 1. get credentials from the body
  // console.log(body);
  const result = userSchema.safeParse(body);

  // 2. verify the user data and check that the name is not taken
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Username or password missing',
      },
      { status: 400 },
    );
  }

  // 3. verify if the user credentials
  const userWithPasswordHash = await getUserWithPasswordHashByUsername(
    result.data.username,
  );

  // check userWithPasswordHash
  // console.log('userWithPassHash', userWithPasswordHash);

  if (!userWithPasswordHash) {
    return NextResponse.json(
      {
        error: 'User or password not valid!',
      },
      { status: 401 },
    );
  }

  // hash the password
  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  // check if valid
  // console.log(
  //   'is valid',
  //   isPasswordValid,
  //   result.data.password,
  //   userWithPasswordHash.passwordHash,
  // );

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        error: 'User or password not valid!',
      },
      { status: 401 },
    );
  }

  // After authenticating user:

  // 4. Create a token
  const token = crypto.randomBytes(100).toString('base64');
  // 5. Create session record
  const session = await createSession(token, userWithPasswordHash.id);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Error creating the new session',
      },
      { status: 500 },
    );
  }

  // 6. Send new cookie in the headders
  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  return NextResponse.json(
    {
      user: {
        username: userWithPasswordHash.username,
        id: userWithPasswordHash.id,
      },
    },
    {
      status: 200,
    },
  );
}

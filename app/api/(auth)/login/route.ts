import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { creaateSession } from '../../../../database/sessions';
import {
  getUserWithPasswordHashByUsername,
  User,
} from '../../../../database/user';

type Error = {
  error: string;
};

export type LoginResponseBodyPost =
  | {
      user: User;
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

  // get credentials from the body
  // console.log(body);
  const result = userSchema.safeParse(body);

  // verify the user data and check that the name is not taken
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Username or password missing',
      },
      { status: 400 },
    );
  }

  // verify if the user credentials
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

  // 1. Create a token
  const token = crypto.randomBytes(100).toString('base64');
  // 2. Create session record
  const session = creaateSession(token, userWithPasswordHash.id);

  console.log(session);
  // 3. Send new cookie in the headders

  return NextResponse.json({
    user: {
      username: userWithPasswordHash.username,
      id: userWithPasswordHash.id,
    },
  });
}

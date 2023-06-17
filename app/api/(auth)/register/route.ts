import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUser, getUserByUsername, User } from '../../../../database/user';

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

  return NextResponse.json({ user: newUser });
}

import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
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

  return NextResponse.json({
    user: {
      username: userWithPasswordHash.username,
      id: userWithPasswordHash.id,
    },
  });

  // // store credentials in the DB
  // // const newUser = await createUser(result.data.username, passwordHash);

  // if (!newUser) {
  //   // zod send you details about the error
  //   // console.log(result.error);
  //   return NextResponse.json(
  //     {
  //       error: 'Error creating the new user',
  //     },
  //     { status: 500 },
  //   );
  // }

  // return NextResponse.json({ user: newUser });
}

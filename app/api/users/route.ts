import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getValidSessionByToken } from '../../../database/sessions';
import {
  deleteUserById,
  getUsersWithLimitAndOffsetBySessionToken,
  updateUserById,
} from '../../../database/users';
import { User } from '../../../migrations/1687352892-createTableUsers';

export type Error = {
  error: string;
};

type UsersResponseBodyGet = { user: User[] } | Error;
type UserResponseBodyDelete = { user: User[] } | Error;
type UserResponseBodyPut = { user: User[] } | Error;

const userSchema = z.object({
  username: z.string(),
  email: z.string(),
  profileName: z.string(),
  bio: z.string(),
  shopId: z.number(),
  profileImageId: z.number(),
});

export async function GET(
  request: NextRequest,
): Promise<NextResponse<UsersResponseBodyGet>> {
  const { searchParams } = new URL(request.url);

  // 1. get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the token has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) {
    return NextResponse.json(
      {
        error: 'Invalid Sessions Token',
      },
      { status: 401 },
    );
  }

  const limit = Number(searchParams.get('limit'));
  const offset = Number(searchParams.get('offset'));

  if (!limit || !offset) {
    return NextResponse.json(
      {
        error: 'Limit and Offset need to be passed as params',
      },
      { status: 400 },
    );
  }

  // query the database to get all the users only if a valid session token is passed
  const users = await getUsersWithLimitAndOffsetBySessionToken(
    limit,
    offset,
    sessionTokenCookie.value,
  );

  return NextResponse.json({ users: users });
}

// ////////////////////////////////////////////
export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UserResponseBodyDelete>> {
  const userId = Number(params.userId);

  if (!userId) {
    return NextResponse.json(
      {
        error: 'Invalid User Id',
      },
      { status: 400 },
    );
  }
  // query the database to get all the user
  const user = await deleteUserById(userId);

  if (!user) {
    return NextResponse.json(
      {
        error: 'User Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ user: user });
}

// ////////////////////////////////////////////
export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UserResponseBodyPut>> {
  const userId = Number(params.userId);
  const body = await request.json();

  if (!userId) {
    return NextResponse.json(
      {
        error: 'Invalid User Id',
      },
      { status: 400 },
    );
  }

  // zod please verify the body matches my schema
  const result = userSchema.safeParse(body);

  if (!result.success) {
    // zod sends details about the error
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }
  // query the database to update the user
  const user = await updateUserById(
    userId,
    result.data.username,
    result.data.email,
    result.data.profileName,
    result.data.bio,
    result.data.shopId,
    result.data.profileImageId,
  );

  if (!user) {
    return NextResponse.json(
      {
        error: 'User Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    user: user,
  });
}

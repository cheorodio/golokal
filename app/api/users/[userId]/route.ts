import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteUserById,
  getUserById,
  updateUserById,
} from '../../../../database/users';
import { User } from '../../../../migrations/1687947560-createTableUsers';
import { Error } from '../route';

type UserResponseBodyGet = { user: User } | Error;
type UserResponseBodyDelete = { user: User } | Error;
type UserResponseBodyPut = { user: User } | Error;

const userSchema = z.object({
  username: z.string(),
  email: z.string(),
  profileName: z.string(),
  bio: z.string(),
  shopId: z.number(),
  imageUrl: z.string(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UserResponseBodyGet>> {
  const userId = Number(params.userId);

  if (!userId) {
    return NextResponse.json({ error: 'Invalid User Id' }, { status: 400 });
  }
  // query the database to get all the users
  const user = await getUserById(userId);

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
    result.data.imageUrl,
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

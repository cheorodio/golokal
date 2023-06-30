import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createComment } from '../../../database/comments';
import { getUserBySessionToken } from '../../../database/users';
import { Comment } from '../../../migrations/1688108341-createComments';

const commentsSchema = z.object({
  content: z.string(),
  userId: z.number(),
  shopId: z.number(),
});

export type Error = {
  error: string;
};

export type FavouritesResponseBodyPost = { comments: Comment[] } | Error;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<FavouritesResponseBodyPost>> {
  const token = cookies().get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({
      errors: [{ message: 'Invalid session token' }],
    });
  }

  const body = await request.json();
  const result = commentsSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: [{ message: 'Invalid' }] },
      { status: 400 },
    );
  }

  const newComment = await createComment(
    result.data.content,
    result.data.userId,
    result.data.shopId,
  );

  if (!newComment) {
    return NextResponse.json(
      { errors: [{ message: 'Comment not created!' }] },
      { status: 500 },
    );
  }
  return NextResponse.json({ comment: newComment });
}

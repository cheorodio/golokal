import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createComment } from '../../../database/comments';
import { getUserBySessionToken } from '../../../database/users';
import { Comment } from '../../../migrations/1688217270-createTableComments';

const commentsSchema = z.object({
  content: z.string(),
  userId: z.number(),
  shopId: z.number(),
});

export type Error = {
  error: string;
};

export type CommentsResponseBodyPost = { comment: Comment } | Error;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CommentsResponseBodyPost>> {
  const token = cookies().get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({
      error: 'Invalid session token',
    });
  }

  const body = await request.json();
  const result = commentsSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid' }, { status: 400 });
  }

  const newComment = await createComment(
    result.data.content,
    result.data.userId,
    result.data.shopId,
  );

  if (!newComment) {
    return NextResponse.json(
      { error: 'Comment not created!' },
      { status: 500 },
    );
  }
  return NextResponse.json({ comment: newComment });
}

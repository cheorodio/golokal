import { NextRequest, NextResponse } from 'next/server';
import { deleteCommentById } from '../../../../database/comments';
import { Comment } from '../../../../migrations/1688217270-createTableComments';
import { Error } from '../route';

type CommentResponseBodyDelete = { comment: Comment } | Error;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<CommentResponseBodyDelete>> {
  const commentId = Number(params.commentId);

  if (!commentId) {
    return NextResponse.json(
      {
        error: 'Comment id is not valid',
      },
      { status: 400 },
    );
  }

  const comment = await deleteCommentById(commentId);

  if (!comment) {
    return NextResponse.json(
      {
        error: 'Comment Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ comment: comment });
}

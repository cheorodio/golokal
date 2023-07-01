import { cache } from 'react';
import { Comment } from '../migrations/1688215598-createComments';
import { sql } from './connect';

type CommentsFromUsersInShops = {
  commentId: number;
  commentContent: string | null;
  userId: number;
  userName: string;
  userImageUrl: string | null;
  shopId: number;
};

// create a comment
export const createComment = cache(
  async (content: string, userId: number, shopId: number) => {
    const [comment] = await sql<Comment[]>`
  INSERT INTO comments
    (content, user_id, shop_id)
  VALUES
    (${content}, ${userId}, ${shopId})
  RETURNING
    id,
    content,
    user_id,
    shop_id
  `;

    return comment;
  },
);

// delete a comment
export const deleteCommentById = cache(async (id: number) => {
  const [comment] = await sql<Comment[]>`
  DELETE FROM
    comments
  WHERE
    id = ${id}
  RETURNING *
  `;

  return comment;
});

// get comments along with info of the user that made the comments
export const getCommentsWithUserInfo = cache(async (shopId: number) => {
  const commentsFromUser = await sql<CommentsFromUsersInShops[]>`
  SELECT distinct
    comments.id AS comment_id,
    comments.content AS comment_content,
    users.id AS user_id,
    users.username AS user_name,
    users.image_url AS user_image_url,
    shops.id AS shop_id
  FROM
    comments
  INNER JOIN
    shops ON comments.shop_id  = shops.id
  INNER JOIN
    users ON comments.user_id = users.id
  WHERE
    comments.shop_id = ${shopId}
  `;

  return commentsFromUser;
});

import { cache } from 'react';
import { sql } from './connect';

export type ImageNotNull = {
  id: number;
  userId: number;
  shopId: number;
  imageUrl: string;
};

type ImagesFromUser = {
  id: number;
  imageId: number;
  imageUrl: string;
  userId: number;
  username: string;
  imageUrl: string | null;
};

// Upload a new image
export const createImage = cache(
  async (userId: number, shopId: number, imageUrl: string) => {
    const [image] = await sql<ImageNotNull[]>`
      INSERT INTO images
        (user_id, shop_id, image_url)
      VALUES
        (${userId}, ${shopId}, ${imageUrl})
      RETURNING *
    `;
    return image;
  },
);

// Get images by user
export const getImagesByUserId = cache(async (userId: number) => {
  const images = await sql<ImageNotNull[]>`
    SELECT
      *
    FROM
     images
    WHERE
      images.user_id = ${userId}
  `;
  return images;
});

export const getImagesFromUser = cache(async (userId: number) => {
  const imagesFromUser = await sql<ImagesFromUser[]>`
  SELECT
    images.id AS image_id,
    images.image_url AS image_url,
    users.id AS user_id,
    users.username AS user_name,
    users.image_url AS user_image_url
  FROM
    images
  INNER JOIN
    users ON images.user_id = users.id
  WHERE
    images.user_id = ${userId}
  `;

  return imagesFromUser;
});

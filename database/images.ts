import { cache } from 'react';
import { sql } from './connect';

export type ImageNotNull = {
  id: number;
  userId: number;
  shopId: number;
  imageUrl: string;
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

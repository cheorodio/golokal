import { cache } from 'react';
import { Favourite } from '../migrations/1687958140-createFavourites';
import { sql } from './connect';

type FavouritedShop = {
  favouriteId: number;
  userId: number;
  shopId: number;
  shopUsername: string;
  shopName: string | null;
  shopDescription: string | null;
  shopWebsiteUrl: string | null;
  shopLocation: string | null;
  shopImageUrl: string | null;
};

// get favourites from user
export const getFavourites = cache(async (userId: number) => {
  const favourites = await sql<Favourite[]>`
    SELECT
      *
    FROM
      favourites
    WHERE
      favourites.user_id = ${userId}
  `;
  return favourites;
});

// Add favourite shop for the follow option
export const createFavourite = cache(async (userId: number, shopId: number) => {
  const [favourite] = await sql<Favourite[]>`
      INSERT INTO favourites
        (user_id, shop_id)
      VALUES
        (${userId}, ${shopId})
      RETURNING
      id,
      user_id,
      shop_id
    `;
  return favourite;
});

// display favourited shop on profile
export const getFavouriteByUserId = cache(async (userId: number) => {
  const favouritedShop = await sql<FavouritedShop[]>`
  SELECT distinct
    favourites.id AS favourite_id,
    users.id AS user_id,
    shops.id AS shop_id,
    shops.username AS shop_username,
    shops.name AS shop_name,
    shops.description AS shop_description,
    shops.website_url AS shop_website_url,
    shops.location AS shop_location,
    shops.image_url AS shop_image_url
  FROM
    favourites
  INNER JOIN
    shops ON favourites.shop_id = shops.id
  INNER JOIN
    users ON favourites.user_id = users.id
  WHERE
    favourites.user_id = ${userId}`;

  return favouritedShop;
});

// Delete favourited shop from profile
export const deleteFavouriteById = cache(async (id: number) => {
  const [favourite] = await sql<Favourite[]>`
    DELETE FROM
      favourites
    WHERE
      id = ${id}
    RETURNING *
  `;
  return favourite;
});

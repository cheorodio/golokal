import { cache } from 'react';
import { Favourite } from '../migrations/1687958140-createFavourites';
import { sql } from './connect';

type FavouritedShop = {
  favouritesId: number;
  userdId: number;
  shopId: number;
  shopUsername: string;
  shopName: string | null;
  shopDescription: string | null;
  shopWebsiteUrl: string | null;
  shopLocation: string | null;
  shopShopImage: string | null;
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

// get favourited shop by user
export const getFavouritedShopByUser = cache(
  async (userId: number, shopId: number) => {
    const favourites = await sql<
      { userId: number | null; shopId: number | null }[]
    >`
    SELECT
      user_id,
      shop_id
    FROM
    favourites
    WHERE
      user_id = ${userId} AND
      shop_id = ${shopId}
`;
    return favourites;
  },
);

// Add favourite shop for the follow option
export const createFavourites = cache(
  async (userId: number, shopId: number) => {
    const [favouriteShop] = await sql<Favourite[]>`
      INSERT INTO favourites
        (user_id, shop_id)
      VALUES
        (${userId}, ${shopId})
      RETURNING
      id,
      user_id,
      shop_id
    `;
    return favouriteShop;
  },
);

// display favourited shop on profile
export const getFavouriteByUserId = cache(async (userId: number) => {
  const favouritedShop = await sql<FavouritedShop[]>`
  SELECT
    favourites.id AS favourite_id,
    users.id AS user_id,
    shops.id AS shop_id,
    shops.username AS shop_username,
    shops.name AS shop_name,
    shops.description AS shop_description,
    shops.website_url AS shop_website_url,
    shops.location AS shop_location,
    shops.shop_image AS shop_shop_image
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

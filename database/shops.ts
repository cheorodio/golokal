import { cache } from 'react';
import { Shop } from '../migrations/1688217209-createTableShops';
import { sql } from './connect';

// GET ALL SHOPS FOR SHOPS PAGE ///////////////////////////
export const getShops = cache(async () => {
  const shops = await sql<Shop[]>`
    SELECT
      *
    FROM
      shops
 `;
  return shops;
});

// // GET SHOP ///////////////////////////////////////////////
// export const getShopByUsername = cache(async (username: string) => {
//   const shops = await sql<ShopNotNull[]>`
//     SELECT
//       *
//     FROM
//       shops
//     WHERE
//       username = ${username}
//  `;

//   return shops[0];
// });

// // CREATE SHOP //////////////////////////////
// // 1. first verify if the unique shop username is taken
// export const verifyShopByShopUsername = cache(async (username: string) => {
//   const [shop] = await sql<ShopName[]>`
// SELECT
//   id,
//   username
// FROM
//   users
// WHERE
//   users.username = ${username.toLowerCase()}`;
//   return shop;
// });

// 2. create the shop
export const createShop = cache(
  async (
    name: string,
    description: string,
    websiteUrl: string,
    location: string,
    imageUrl: string,
    userId: number,
  ) => {
    const [shop] = await sql<Shop[]>`
    INSERT INTO shops
      (name, description, website_url, location, image_url, user_id)
    VALUES
      (${name}, ${description}, ${websiteUrl}, ${location}, ${imageUrl}, ${userId})
    RETURNING
      *
 `;
    return shop;
  },
);

// GETTING SHOP ///////////////////////////////////////////////
export const getShopById = cache(async (id: number) => {
  const shops = await sql<Shop[]>`
    SELECT
      *
    FROM
      shops
    WHERE
      id = ${id}
  `;

  return shops[0];
});

export const getShopByUserId = cache(async (userId: number) => {
  const shops = await sql<Shop[]>`
    SELECT
      *
    FROM
      shops
    WHERE
      shops.user_id = ${userId}
    `;

  return shops;
});

// UPDATE SHOP //////////////////////////////////////////////////////////
// updating shop page
export const updateShopById = cache(
  async (
    id: number,
    name: string,
    description: string,
    websiteUrl: string,
    location: string,
    imageUrl: string,
    userId: number,
  ) => {
    const [shop] = await sql<Shop[]>`
      UPDATE shops
      SET
        name = ${name},
        description = ${description},
        website_url = ${websiteUrl},
        location = ${location},
        image_url = ${imageUrl},
        user_id = ${userId}
      WHERE
        id = ${id}
        RETURNING *
    `;
    return shop;
  },
);

// DELETE SHOP /////////////////////////////////
export const deleteShopById = cache(async (id: number) => {
  const [shop] = await sql<Shop[]>`
      DELETE FROM
        shops
      WHERE
        id = ${id}
        RETURNING *
    `;
  return shop;
});

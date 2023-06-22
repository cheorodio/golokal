import { cache } from 'react';
import { Shop } from '../migrations/1687353857-createTableShops';
import { sql } from './connect';

type CreateShop = {
  id: number;
  username: string;
};

// GET SHOP ///////////////////////////////////////////////
export const getShopByUsername = cache(async (username: string) => {
  const [shop] = await sql<Shop[]>`
    SELECT
      id,
      username,
      name,
      description,
      website_url,
      location,
      shop_image_id
    FROM
      shops
    WHERE
      shops.username = ${username.toLowerCase()}
 `;

  return shop;
});

// CREATE SHOP //////////////////////////////
// 1. first verify if the unique shop username is taken
export const verifyShopByShopUsername = cache(async (username: string) => {
  const [user] = await sql<CreateShop[]>`
SELECT
  id,
  username
FROM
  users
WHERE
  users.username = ${username.toLowerCase()}`;
  return user;
});

// 2. create the shop
export const createShop = cache(async (username: string) => {
  const [shop] = await sql<CreateShop[]>`
    INSERT INTO shops
      (username)
    VALUES
      (${username})
    RETURNING
      id,
      username
 `;
  return shop;
});

// GETTING SHOP ///////////////////////////////////////////////
export async function getShopById(id: number) {
  const shops = await sql<Shop[]>`
    SELECT
      *
    FROM
      shops
    WHERE
      id = ${id}
  `;
  return shops;
}

// UPDATE SHOP //////////////////////////////////////////////////////////
// updating shop page
export const updateShopById = cache(
  async (
    id: number,
    username: string,
    name: string,
    description: string,
    websiteUrl: string,
    location: string,
    shopImageId: number,
  ) => {
    const [shop] = await sql<Shop[]>`
      UPDATE shops
      SET
        username = ${username},
        name = ${name},
        description = ${description},
        website_url = ${websiteUrl || null},
        location = ${location},
        shop_image_id = ${shopImageId || null}
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

import { cache } from 'react';
import { sql } from './connect';

type ShopName = {
  id: number;
  username: string;
};

export type ShopNotNull = {
  id: number;
  username: string;
  name: string;
  description: string;
  websiteUrl: string;
  location: string;
  imageUrl: string;
};

// GET ALL SHOPS FOR SHOPS PAGE ///////////////////////////
export const getShops = cache(async () => {
  const shops = await sql<ShopNotNull[]>`
    SELECT
      *
    FROM
      shops
 `;
  return shops;
});

// GET SHOP ///////////////////////////////////////////////
export const getShopByUsername = cache(async (username: string) => {
  const shops = await sql<ShopNotNull[]>`
    SELECT
      *
    FROM
      shops
    WHERE
      username = ${username}
 `;

  return shops[0];
});

// CREATE SHOP //////////////////////////////
// 1. first verify if the unique shop username is taken
export const verifyShopByShopUsername = cache(async (username: string) => {
  const [shop] = await sql<ShopName[]>`
SELECT
  id,
  username
FROM
  users
WHERE
  users.username = ${username.toLowerCase()}`;
  return shop;
});

// 2. create the shop
export const createShop = cache(
  async (
    username: string,
    name: string,
    description: string,
    websiteUrl: string,
    location: string,
    imageUrl: string,
  ) => {
    const [shop] = await sql<ShopNotNull[]>`
    INSERT INTO shops
      (username, name, description, website_url, location, image_url)
    VALUES
      (${username}, ${name}, ${description}, ${websiteUrl}, ${location}, ${imageUrl})
    RETURNING
      id,
      username,
      name,
      description,
      website_url,
      location,
      image_url
 `;
    return shop;
  },
);

// GETTING SHOP ///////////////////////////////////////////////
export const getShopById = cache(async (id: number) => {
  const shops = await sql<ShopNotNull[]>`
    SELECT
      *
    FROM
      shops
    WHERE
      id = ${id}
  `;

  return shops[0];
});

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
    imageUrl: string,
  ) => {
    const [shop] = await sql<ShopNotNull[]>`
      UPDATE shops
      SET
        username = ${username},
        name = ${name},
        description = ${description},
        website_url = ${websiteUrl},
        location = ${location},
        image_url = ${imageUrl}
      WHERE
        id = ${id}
        RETURNING *
    `;
    return shop;
  },
);

// DELETE SHOP /////////////////////////////////
export const deleteShopById = cache(async (id: number) => {
  const [shop] = await sql<ShopNotNull[]>`
      DELETE FROM
        shops
      WHERE
        id = ${id}
        RETURNING *
    `;
  return shop;
});

import { cache } from 'react';
import { Shop } from '../migrations/1687353857-createTableShops';
import { sql } from './connect';

type CreateShop = {
  id: number;
  name: string;
  description: string;
  location: string;
};

// CREATE SHOP //////////////////////////////
export const createShop = cache(
  async (name: string, description: string, location: string) => {
    const [shop] = await sql<CreateShop[]>`
    INSERT INTO shops
      (name, description, location)
    VALUES
      (${name}, ${description}, ${location})
    RETURNING
      id,
      name,
      description,
      location
 `;
    return shop;
  },
);

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
    name: string,
    description: string,
    websiteUrl: string,
    location: string,
    shopImageId: number,
  ) => {
    const [shop] = await sql<Shop[]>`
      UPDATE shops
      SET
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

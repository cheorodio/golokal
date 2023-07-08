import { cache } from 'react';
import { Product } from '../migrations/1688217286-createTableProducts';
import { sql } from './connect';

type ShopProduct = {
  productId: number;
  shopId: number;
  shopShopname: string;
  userId: number;
  productName: string;
  productCategory: string;
  productDescription: string;
  productImageUrl: string;
};

export const getProducts = cache(async () => {
  const products = await sql<Product[]>`
    SELECT * FROM products
 `;

  return products;
});

export const getProductsWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    const products = await sql<Product[]>`
      SELECT
        *
      FROM
        products
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return products;
  },
);

export const getProductsWithLimitAndOffsetBySessionToken = cache(
  async (limit: number, offset: number, token: string) => {
    const products = await sql<Product[]>`
      SELECT
        products.*
      FROM
        products
      INNER JOIN
        sessions ON (
          sessions.token = ${token} AND
          sessions.expiry_timestamp > now()
        )
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return products;
  },
);

// GETTING PRODUCTS
export const getProductsById = cache(async (id: number) => {
  const [product] = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      id = ${id}
  `;
  return product;
});

export const getProductByShopId = cache(async (shopId: number) => {
  const productsInShop = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      products.shop_id = ${shopId}
  `;

  return productsInShop;
});

// CREATING PRODUCTS /////////////////////
export const createProduct = cache(
  async (
    userId: number,
    shopId: number,
    name: string,
    category: string,
    description: string,
    imageUrl: string,
  ) => {
    const [productToCreate] = await sql<Product[]>`
      INSERT INTO products
        (user_id, shop_id, name, category, description,  image_url)
      VALUES
        (${userId}, ${shopId}, ${name}, ${category}, ${description}, ${imageUrl})
      RETURNING *
    `;

    return productToCreate;
  },
);

// Get all info form products
export const getProductsWithInfo = cache(async (shopId: number) => {
  const productsInShop = await sql<ShopProduct[]>`
  SELECT distinct
    products.id AS product_id,
    users.id AS user_id,
    shops.id AS shop_id,
    shops.name AS shop_shopName,
    products.name AS product_name,
    products.category AS product_category,
    products.description AS product_description,
    products.image_url AS product_image_url
  FROM
    products
  INNER JOIN
    shops ON products.shop_id = shops.id
  INNER JOIN
    users ON products.user_id = users.id
  WHERE
    products.shop_id = ${shopId}
  `;

  return productsInShop;
});

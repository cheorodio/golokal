import { cache } from 'react';
import { ProductsInShop } from '../migrations/1688121356-createProductsInShops';
import { sql } from './connect';

// get products from shops
export const getProductsInShop = cache(async (shopId: number) => {
  const productsInShop = await sql<ProductsInShop[]>`
    SELECT
      *
    FROM
      products_in_shops
    WHERE
    products_in_shops.shop_id = ${shopId}
  `;
  return productsInShop;
});

// create products for shops
export const createProductsInShop = cache(
  async (shopId: number, productId: number) => {
    const [productsInShop] = await sql<ProductsInShop[]>`
      INSERT INTO products_in_shops
        (shop_id, product_id)
      VALUES
        (${shopId}, ${productId})
      RETURNING
      id,
      shop_id,
      product_id
    `;
    return productsInShop;
  },
);

// display products on shop page
export const getProductsInShopByShopId = cache(async (shopId: number) => {
  const productsInShop = await sql<ProductsInShop[]>`
  SELECT distinct
    products_in_shops.id AS products_in_shops_id,
    shops.id AS shop_id,
    products.id AS product_id,
    products.name AS product_name,
    products.category AS product_category,
    products.description AS product_description,
    products.image_url AS product_image_url
  FROM
    products_in_shops
  INNER JOIN
    products ON products_in_shops.product_id = products.id
  INNER JOIN
    shops ON products_in_shops.shop_id = shops.id
  WHERE
  products_in_shops.shop_id = ${shopId}
  `;

  return productsInShop;
});

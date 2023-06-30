import { cache } from 'react';
import { Product } from '../migrations/1688118721-createProducts';
import { sql } from './connect';

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
    name: string,
    category: string,
    description: string,
    imageUrl: string,
    shopId: number,
  ) => {
    const [productToCreate] = await sql<Product[]>`
      INSERT INTO products
        (name, category, description, image_url, shop_id)
      VALUES
        (${name}, ${category}, ${description}, ${imageUrl}, ${shopId})
      RETURNING *
    `;

    return productToCreate;
  },
);

// EDITING PRODUCTS /////////////////////
export const updateProductById = cache(
  async (
    id: number,
    name: string,
    category: string,
    description: string,
    imageUrl: string,
  ) => {
    const [productToEdit] = await sql<Product[]>`
      UPDATE products
      SET
        name = ${name},
        category = ${category},
        description = ${description},
        image_url = ${imageUrl}
      WHERE
        id = ${id}
      RETURNING *
    `;

    return productToEdit;
  },
);

// DELETING PRODUCTS ////////////////
export const deleteProductsById = cache(async (id: number) => {
  const [productsToDelete] = await sql<Product[]>`
    DELETE FROM
      products
    WHERE
      id = ${id}
    RETURNING *
  `;
  return productsToDelete;
});

// // GETTING ONE PRODUCT ///////////////
// export const products: Product[] = [
//   {
//     id: 1,
//     name: 'Ocean',
//     category: 'Candles',
//     description:
//       'Introducing our exquisite hand-poured ocean-scented candles, crafted to bring the refreshing essence of the sea into your living space. Immerse yourself in the tranquil atmosphere of coastal serenity with every flicker of our artisanal candles.',
//     imageUrl: '/images/shop.png',
//   },
//   {
//     id: 2,
//     name: 'Christmas',
//     category: 'Candles',
//     description:
//       'Introducing our enchanting hand-poured Christmas-scented candles, meticulously crafted to infuse your home with the nostalgic and heartwarming aromas of the holiday season. Immerse yourself in the magical ambiance of Christmas with every flicker of our artisanal candles.',
//     imageUrl: '/images/shop.png',
//   },
// ];

// export function getProductById(id: number) {
//   return products.find((product) => product.id === id);
// }

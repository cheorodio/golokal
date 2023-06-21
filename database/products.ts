import { cache } from 'react';
import { Product } from '../migrations/1687183921-createProductsTable';
import { sql } from './connect';

export const getProducts = cache(async () => {
  const products = await sql<Product[]>`
    SELECT * FROM products
 `;

  return products;
});

export const getProductsByVendorId = cache(async (id: number) => {
  const productsFromVendor = await sql<Product[]>`
  SELECT
    products.id,
    products.name,
    products.category,
    products.description
  FROM
    products
  WHERE
    products.vendor_id = ${id}
  `;

  return productsFromVendor;
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
          -- sessions.vendor_id = products.vendor_id
        )
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return products;
  },
);

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

export const createProduct = cache(
  async (
    name: string,
    category: string,
    description: string,
    // vendorId: number,
  ) => {
    const [product] = await sql<Product[]>`
      INSERT INTO products
        (name, category, description)
      VALUES
        (${name}, ${category}, ${description})
      RETURNING *
    `;

    return product;
  },
);

import { cache } from 'react';
import { Product } from '../migrations/1687338175-createProducts';
import { sql } from './connect';

export const getProducts = cache(async () => {
  const products = await sql<Product[]>`
    SELECT * FROM products
 `;

  return products;
});

// export const getProductsByVendorId = cache(async (id: number) => {
//   const productsFromVendor = await sql<Product[]>`
//   SELECT
//     products.id,
//     products.name,
//     products.category,
//     products.description,
//     products.image
//   FROM
//     products
//   WHERE
//     products.vendor_id = ${id}
//   `;

//   return productsFromVendor;
// });

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

// CREATING PRODUCTS /////////////////////
export const createProduct = cache(
  async (
    name: string,
    category: string,
    description: string,
    image: string,
  ) => {
    const [productToCreate] = await sql<Product[]>`
      INSERT INTO products
        (name, category, description, image)
      VALUES
        (${name}, ${category}, ${description}, ${image})
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
    image: string,
  ) => {
    const [productToEdit] = await sql<Product[]>`
      UPDATE products
      SET
        name = ${name},
        category = ${category},
        description = ${description},
        image = ${image}
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

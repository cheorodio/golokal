import { cache } from 'react';
import { Product } from '../migrations/1687183921-createProductsTable';
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
    productType: string,
    category: string,
    description: string,
    // vendorId: number,
  ) => {
    const [product] = await sql<Product[]>`
      INSERT INTO products
        (name, product_type, category, description)
      VALUES
        (${name}, ${productType}, ${category}, ${description})
      RETURNING *
    `;

    return product;
  },
);

// export const updateAnimalById = cache(
//   async (id: number, firstName: string, type: string, accessory?: string) => {
//     const [animal] = await sql<Animal[]>`
//       UPDATE animals
//       SET
//         first_name = ${firstName},
//         type = ${type},
//         accessory = ${accessory || null}
//       WHERE
//         id = ${id}
//         RETURNING *
//     `;

//     return animal;
//   },
// );

// export const deleteAnimalById = cache(async (id: number) => {
//   const [animal] = await sql<Animal[]>`
//     DELETE FROM
//       animals
//     WHERE
//       id = ${id}
//     RETURNING *
//   `;
//   return animal;
// });

// export const getAnimalsWithFoods = cache(async (id: number) => {
//   const animalFoods = await sql<AnimalFoods[]>`
//    SELECT
//      animals.id AS animal_id,
//      animals.first_name AS animal_first_name,
//      animals.type AS animal_type,
//      animals.accessory AS animal_accessory,
//      foods.id AS food_id,
//      foods.name AS food_name,
//      foods.type AS food_type
//     FROM
//      animals
//     INNER JOIN
//       animal_foods ON animals.id = animal_foods.animal_id
//     INNER JOIN
//       foods ON foods.id = animal_foods.food_id
//     WHERE animals.id = ${id}
//   `;
//   return animalFoods;
// });

// // Join query for getting a single animal with related foods using json_agg
// export const getAnimalWithFoodsById = cache(async (id: number) => {
//   const [animal] = await sql<AnimalWithFoodsInJsonAgg[]>`
// SELECT
//   animals.id AS animal_id,
//   animals.first_name AS animal_name,
//   animals.type AS animal_type,
//   animals.accessory AS animal_accessory,
//   (
//     SELECT
//       json_agg(foods.*)
//     FROM
//       animal_foods
//     INNER JOIN
//       foods ON animal_foods.food_id = foods.id
//     WHERE
//       animal_foods.animal_id = animals.id

//   ) AS animal_foods
// FROM
//   animals
// WHERE
//   animals.id = ${id}
// GROUP BY
//   animals.first_name, animals.type, animals.accessory, animals.id;
//   `;

//   return animal;
// });

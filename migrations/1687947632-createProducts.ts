import { Sql } from 'postgres';

export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  // productImageId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(30) NOT NULL,
      category varchar(30) NOT NULL,
      description varchar(500) NOT NULL
      -- product_image_id integer NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE products
  `;
}

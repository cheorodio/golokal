import { Sql } from 'postgres';

export type Shop = {
  id: number;
  username: string;
  name: string;
  description: string;
  websiteUrl: string;
  location: string;
  shopImageId: number;
};

export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE products_in_shops (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      shop_id integer NOT NULL REFERENCES shops (id) ON DELETE CASCADE,
      product_id integer NOT NULL REFERENCES products (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE products_in_shops
  `;
}

import { Sql } from 'postgres';

export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  imageUrl: string | null;
  shopId: number | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(30) NOT NULL,
      category varchar(30) NOT NULL,
      description varchar(500) NOT NULL,
      image_url varchar(500),
      shop_id integer REFERENCES shops (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE products
  `;
}

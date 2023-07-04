import { Sql } from 'postgres';

export type Product = {
  id: number;
  userId: number | null;
  shopId: number | null;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      shop_id integer REFERENCES shops (id) ON DELETE CASCADE,
      name varchar(30) NOT NULL,
      category varchar(30) NOT NULL,
      description varchar(500) NOT NULL,
      image_url varchar(500) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE products
  `;
}

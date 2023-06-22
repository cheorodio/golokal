import { Sql } from 'postgres';

export type Shop = {
  id: number;
  username: string;
  name: string;
  description: string | null;
  websiteUrl: string | null;
  location: string | null;
  shopImageId: number | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE shops (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(30) NOT NULL UNIQUE,
      name varchar(30) NOT NULL,
      description varchar(500),
      website_url varchar(80),
      location varchar(40),
      shop_image_id integer
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE shops
  `;
}

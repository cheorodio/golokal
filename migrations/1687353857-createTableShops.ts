import { Sql } from 'postgres';

export type Shop = {
  id: number;
  name: string;
  description: string;
  websiteUrl: string;
  location: string;
  shopImageId: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE shops (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(30),
      description varchar(500),
      website_url varchar(30),
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

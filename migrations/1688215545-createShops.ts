import { Sql } from 'postgres';

export type Shop = {
  id: number;
  name: string | null;
  description: string | null;
  websiteUrl: string | null;
  location: string | null;
  imageUrl: string | null;
  userId: number | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE shops (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(30),
      description varchar(500),
      website_url varchar(80),
      location varchar(40),
      image_url varchar(500),
      user_id integer REFERENCES users (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE shops
  `;
}

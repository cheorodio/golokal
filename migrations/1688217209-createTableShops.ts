import { Sql } from 'postgres';

export type Shop = {
  id: number;
  name: string;
  description: string;
  websiteUrl: string;
  location: string;
  imageUrl: string;
  userId: number | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE shops (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(30) NOT NULL,
      description varchar(500) NOT NULL,
      website_url varchar(80) NOT NULL,
      location varchar(40) NOT NULL,
      image_url varchar(500) NOT NULL,
      user_id integer REFERENCES users (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE shops
  `;
}

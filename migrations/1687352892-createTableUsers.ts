import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  profileName: string;
  bio: string;
  shopId: string;
  profileImageId: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(30) NOT NULL,
      email varchar(30) NOT NULL,
      password_hash varchar(30) NOT NULL,
      profile_name varchar(40),
      bio varchar(500),
      shop_id integer,
      profile_image_id integer
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}

import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  email: string;
  profileName: string;
  bio: string;
  imageUrl: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(80) NOT NULL UNIQUE,
      email varchar(80) NOT NULL,
      password_hash varchar(80) NOT NULL,
      profile_name varchar(40) NOT NULL,
      bio varchar(500) NOT NULL,
      image_url varchar(500) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}

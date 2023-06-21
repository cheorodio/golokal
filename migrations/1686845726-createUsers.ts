import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string | null;
  bio: string | null;
};

export async function up(sql: Sql) {
  // use sql parameter to create a function to create the table
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(80) NOT NULL,
      email varchar(80) NOT NULL,
      password_hash varchar(80) NOT NULL,
      first_name varchar(80),
      bio varchar(500)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}

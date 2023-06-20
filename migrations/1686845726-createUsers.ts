import { Sql } from 'postgres';

export type User = {
  id: number;
  firstName: string;
  username: string;
  email: string;
  bio: string;
};

export async function up(sql: Sql) {
  // use sql parameter to create a function to create the table
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      first_name varchar(80),
      username varchar(80) NOT NULL,
      email varchar(80) NOT NULL,
      password_hash varchar(80) NOT NULL,
      bio varchar(500)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}

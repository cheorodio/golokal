import { Sql } from 'postgres';

export type Vendor = {
  id: number;
  username: string;
  shopname: string;
  email: string;
  firstName: string | null;
  websiteLink: string | null;
  bio: string | null;
  image: string | null;
};

export async function up(sql: Sql) {
  // use sql parameter to create a function to create the table
  await sql`
    CREATE TABLE vendors (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(80) NOT NULL,
      shopname varchar(80) NOT NULL,
      email varchar(80) NOT NULL,
      password_hash varchar(80) NOT NULL,
      first_name varchar(80),
      website_link varchar(80),
      bio varchar(500),
      image varchar(500)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE vendors
  `;
}

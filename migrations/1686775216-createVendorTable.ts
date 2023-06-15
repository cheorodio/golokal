import { Sql } from 'postgres';

export type Vendors = {
  id: number;
  name: string;
  shopName: string;
  bio: string;
};

export async function up(sql: Sql) {
  // use sql parameter to create a function to create the table
  await sql`
    CREATE TABLE vendors (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(30) NOT NULL,
      shop_name varchar(30) NOT NULL,
      bio varchar(500) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE vendors
  `;
}

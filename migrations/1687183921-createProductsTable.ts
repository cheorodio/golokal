import { Sql } from 'postgres';

export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  vendorId: number;
  image: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(30) NOT NULL,
      category varchar(40) NOT NULL,
      description varchar(500) NOT NULL,
      vendor_id integer REFERENCES vendors (id),
      image varchar(100)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE products
  `;
}

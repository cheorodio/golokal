import { Sql } from 'postgres';

export type Product = {
  id: number;
  name: string;
  productType: string;
  category: string;
  description: string;
  vendorId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(30) NOT NULL,
      product_type varchar(30) NOT NULL,
      category varchar(40) NOT NULL,
      description varchar(200) NOT NULL,
      vendor_id integer REFERENCES vendors (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE products
  `;
}

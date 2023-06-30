import { Sql } from 'postgres';

export type Product = {
  id: number;
  userId: number | null;
  shopId: number | null;
  name: string | null;
  category: string | null;
  description: string | null;
  imageUrl: string | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer REFERENCES users (id),
      shop_id integer REFERENCES shops (id),
      name varchar(30),
      category varchar(30),
      description varchar(500),
      image_url varchar(500)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE products
  `;
}


// ////////////////////////////////////////
// First version DELETE LATER /////////////
// import { Sql } from 'postgres';

// export type Product = {
//   id: number;
//   shopId: number | null;
//   name: string;
//   category: string;
//   description: string;
//   imageUrl: string | null;
// };

// export async function up(sql: Sql) {
//   await sql`
//     CREATE TABLE products (
//       id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//       shop_id integer REFERENCES shops (id),
//       name varchar(30) NOT NULL,
//       category varchar(30) NOT NULL,
//       description varchar(500) NOT NULL,
//       image_url varchar(500)
//     )
//   `;
// }

// export async function down(sql: Sql) {
//   await sql`
//     DROP TABLE products
//   `;
// }

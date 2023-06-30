import { Sql } from 'postgres';

export type Image = {
  id: number;
  userId: number | null;
  shopId: number | null;
  imageUrl: string | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE images (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      shop_id integer REFERENCES shops (id) ON DELETE CASCADE,
      image_url varchar(500)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE images
  `;
}

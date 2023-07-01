import { Sql } from 'postgres';

export type Favourite = {
  id: number;
  userId: number | null;
  shopId: number | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE favourites (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      shop_id integer REFERENCES shops (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE favourites
  `;
}

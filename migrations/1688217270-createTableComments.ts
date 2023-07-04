import { Sql } from 'postgres';

export type Comment = {
  id: number;
  content: string;
  userId: number | null;
  shopId: number | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE comments (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      content varchar(500) NOT NULL,
      user_id integer REFERENCES users (id),
      shop_id integer REFERENCES shops (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE comments
  `;
}

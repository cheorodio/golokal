import { Sql } from 'postgres';

export type Session = {
  id: number;
  token: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE sessions (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      token varchar(150) NOT NULL UNIQUE,
      expiry_timestamp timestamp NOT NULL DEFAULT NOW() + INTERVAL '24 hours',
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      vendor_id integer REFERENCES vendors (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE sessions
  `;
}

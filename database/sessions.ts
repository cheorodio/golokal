import { cache } from 'react';
import { Session } from '../migrations/1687947607-createSessions';
import { sql } from './connect';

export const deleteExpiredSessions = cache(async () => {
  await sql`
    DELETE FROM
       sessions
    WHERE
      expiry_timestamp < now()
  `;
});

export const createSession = cache(async (token: string, userId: number) => {
  const [session] = await sql<Session[]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING
      id,
      token,
      user_id
    `;

  // delete all expired sessions
  await deleteExpiredSessions();
  return session;
});

export const deleteSessionByToken = cache(async (token: string) => {
  const [session] = await sql<{ id: number; token: string }[]>`
    DELETE FROM
      sessions
    WHERE
      sessions.token = ${token}
    RETURNING
      id,
      token
  `;

  return session;
});

// make it a query that returns session data and username data
export const getValidSessionByToken = cache(async (token: string) => {
  // Get the session if match the token AND is not expired
  const [session] = await sql<{ id: number; token: string }[]>`
    SELECT
      sessions.id,
      sessions.token
    FROM
      sessions
    WHERE
      sessions.token = ${token}
    AND
      sessions.expiry_timestamp > now()
  `;

  return session;
});

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<{ id: number; shopId: number | null }[]>`
  SELECT
    users.id,
    users.shop_id
  FROM
    users,
    shops
  INNER JOIN
    sessions ON (
      sessions.token = ${token} AND
      sessions.user_id = shops.id AND
      sessions.expiry_timestamp > now()
    )
  `;

  return user;
});

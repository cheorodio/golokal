import { cache } from 'react';
import { Session } from '../migrations/1687078261-createSessions';
import { sql } from './connect';

export const creaateSession = cache(async (token: string, userId: number) => {
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

  return session;
});

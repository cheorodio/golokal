import { cache } from 'react';
import { Session } from '../migrations/1687338190-createSessions';
import { sql } from './connect';

export const deleteExpiredSessions = cache(async () => {
  await sql`
    DELETE FROM
       sessions
    WHERE
      expiry_timestamp < now()
  `;
});

// USERS SESSION ////////////////////////////
export const createSession = cache(
  async (token: string, userId: number, vendorId: number) => {
    const [session] = await sql<Session[]>`
    INSERT INTO sessions
      (token, user_id, vendor_id)
    VALUES
      (${token}, ${userId}, ${vendorId})
    RETURNING
      id,
      token,
      user_id,
      vendor_id
    `;

    // delete all expired sessions
    await deleteExpiredSessions();
    return session;
  },
);

// VENDORS SESSIONS /////////////////////////
// export const createVendorSession = cache(
//   async (token: string, vendorId: number) => {
//     const [vendorSession] = await sql<Session[]>`
//     INSERT INTO sessions
//       (token, vendor_id)
//     VALUES
//       (${token}, ${vendorId})
//     RETURNING
//       id,
//       token
//     `;
//     await deleteExpiredSessions();
//     return vendorSession;
//   },
// );

// get valid session only if a vendor
// export const getValidSessionByVendorToken = cache(async (token: string) => {
//   // Get the session if match the token AND is not expired
//   const [vendorSession] = await sql<
//     { id: number; token: string; vendorId: number }[]
//   >`
//     SELECT
//       sessions.id,
//       sessions.token,
//       session.vendor_id,
//     FROM
//       sessions
//     WHERE
//       sessions.token = ${token}
//     AND
//       sessions.expiry_timestamp > now()
//   `;

//   return vendorSession;
// });

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

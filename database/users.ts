import { cache } from 'react';
import { User } from '../migrations/1686845726-createUsers';
import { sql } from './connect';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

type CreateUser = {
  id: number;
  username: string;
  email: string;
};

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
SELECT * FROM
  users
WHERE
  users.username = ${username}`;
    return user;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
SELECT
  id,
  username,
  email,
  first_name,
  bio
FROM
  users
WHERE
  users.username = ${username.toLowerCase()}`;
  return user;
});

// creating new users
export const createUser = cache(
  async (username: string, email: string, passwordHash: string) => {
    const [user] = await sql<CreateUser[]>`
    INSERT INTO users
      ( username, email, password_hash)
    VALUES
      (${username.toLowerCase()}, ${email}, ${passwordHash})
    RETURNING
      id,
      username,
      email
 `;
    return user;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<CreateUser[]>`
  SELECT
    users.id,
    users.username,
    users.email
  FROM
    users
  INNER JOIN
    sessions ON (
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
    )
  `;

  return user;
});

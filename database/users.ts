import { cache } from 'react';
import { User } from '../migrations/1686845726-createUsers';
import { sql } from './connect';

export type UserWithPasswordHash = User & {
  passwordHash: string;
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
  first_name,
  username,
  email,
  bio
FROM
  users
WHERE
  users.username = ${username.toLowerCase()}`;
  return user;
});

// creating new users
export const createUser = cache(
  async (
    firstName: string | null,
    username: string,
    email: string,
    passwordHash: string,
    bio: string | null,
  ) => {
    console.log(passwordHash);
    const [user] = await sql<User[]>`
    INSERT INTO users
      (first_name, username, email, password_hash, bio)
    VALUES
      (${firstName}, ${username.toLowerCase()}, ${email}, ${passwordHash}, ${bio})
    RETURNING
      id,
      first_name,
      username,
      email,
      bio
 `;

    return user;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
  SELECT
    users.id,
    users.first_name,
    users.username,
    users.email,
    users.bio
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

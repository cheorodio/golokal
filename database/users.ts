import { cache } from 'react';
import { User } from '../migrations/1687352892-createTableUsers';
import { sql } from './connect';

type UserWithPasswordHash = User & {
  passwordHash: string;
};

type CreateUser = {
  id: number;
  username: string;
  email: string;
};

type UserSession = {
  id: number;
  username: string;
};

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT * FROM
      users
    WHERE
      users.username = ${username.toLowerCase()}
 `;

    return user;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      username,
      email,
      profile_name,
      bio,
      shop_id,
      profile_image_id
    FROM
      users
    WHERE
      users.username = ${username.toLowerCase()}
 `;

  return user;
});

// creating new users
export const createUser = cache(
  async (username: string, email: string, passwordHash: string) => {
    console.log(passwordHash);
    const [user] = await sql<CreateUser[]>`
    INSERT INTO users
      (username, email, password_hash)
    VALUES
      (${username}, ${email}, ${passwordHash})
    RETURNING
      id,
      username,
      email
 `;
    return user;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<UserSession[]>`
  SELECT
    users.id,
    users.username
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

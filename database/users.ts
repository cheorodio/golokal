import { cache } from 'react';
import { User } from '../migrations/1687947560-createUsers';
import { sql } from './connect';

type UserWithPasswordHash = User & {
  passwordHash: string;
};

type CreateUser = {
  id: number;
  username: string;
  email: string;
  profileName: string | null;
  bio: string | null;
};

export const getUsers = cache(async () => {
  const users = await sql<UserWithPasswordHash[]>`
  SELECT
    *
  FROM
    users
  `;
  return users;
});

// creating a new user
export const createUser = cache(
  async (
    username: string,
    email: string,
    passwordHash: string,
    profileName: string,
    bio: string,
  ) => {
    const [user] = await sql<CreateUser[]>`
    INSERT INTO users
      (username, email, password_hash, profile_name, bio)
    VALUES
      (${username.toLowerCase()}, ${email}, ${passwordHash}, ${profileName}, ${bio})
    RETURNING
      id,
      username,
      email,
      profile_name,
      bio
 `;
    return user;
  },
);

// USER LOGIN //////////////////////////////////////////////////////////
// verifying the user credentials when logging in
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

// GET USER ///////////////////////////////////////////////
export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      users.username = ${username.toLowerCase()}
 `;

  return user;
});

export const getUserById = cache(async (id: number) => {
  const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user;
});

// //////////////////////////////////////////////////////////
// get all the user only if a valid session token is passed
export const getUsersWithLimitAndOffsetBySessionToken = cache(
  async (limit: number, offset: number, token: string) => {
    const users = await sql<UserWithPasswordHash[]>`
      SELECT
        users.*
      FROM
        users
      INNER JOIN
        sessions ON (
          sessions.token = ${token} AND
          sessions.expiry_timestamp > now()
          -- sessions.vendor_id = products.vendor_id
        )
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return users;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<{ id: number; username: string }[]>`
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

// UPDATE PROFILE //////////////////////////////////////////////////////////
// updating user profile page
export const updateUserById = cache(
  async (
    id: number,
    username: string,
    email: string,
    profileName: string,
    bio: string,
    shopId: number,
    profileImage: string,
  ) => {
    const [user] = await sql<UserWithPasswordHash[]>`
      UPDATE users
      SET
        username = ${username},
        email = ${email},
        profile_name = ${profileName},
        bio = ${bio},
        shop_id = ${shopId},
        profile_image = ${profileImage}
      WHERE
        id = ${id}
        RETURNING *
    `;
    return user;
  },
);

// DELETE USER /////////////////////////////////
export const deleteUserById = cache(async (id: number) => {
  const [user] = await sql<UserWithPasswordHash[]>`
      DELETE FROM
        users
      WHERE
        id = ${id}
        RETURNING *
    `;
  return user;
});

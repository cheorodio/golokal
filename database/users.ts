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

// REGISTERING A NEW USER //////////////////////////////////////////////////////////
// 1. verify if the username is already taken when registering
export const verifyUserByUsername = cache(async (username: string) => {
  const [user] = await sql<CreateUser[]>`
SELECT
  id,
  username,
  email
FROM
  users
WHERE
  users.username = ${username.toLowerCase()}`;
  return user;
});

// 2. when verified that the username is not already taken, proceed to creating a new user
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
    profileImageId: number,
  ) => {
    const [user] = await sql<UserWithPasswordHash[]>`
      UPDATE users
      SET
        username = ${username},
        email = ${email},
        profile_name = ${profileName || null},
        bio = ${bio || null},
        shop_id = ${shopId || null},
        profile_image_id = ${profileImageId || null}
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

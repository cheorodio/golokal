import { cache } from 'react';
import { Vendor } from '../migrations/1687100213-createVendors';
import { sql } from './connect';

export type VendorWithPasswordHash = Vendor & {
  passwordHash: string;
};

export const getVendors = cache(async () => {
  const vendors = await sql<VendorWithPasswordHash[]>`
    SELECT
      *
    FROM
      vendors
 `;
  return vendors;
});

export const getVendorsWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    const vendors = await sql<VendorWithPasswordHash[]>`
      SELECT
        *
      FROM
        vendors
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return vendors;
  },
);

export const getVendorsWithLimitAndOffsetBySessionToken = cache(
  async (limit: number, offset: number, token: string) => {
    const vendors = await sql<VendorWithPasswordHash[]>`
      SELECT
        vendors.*
      FROM
        vendors
      INNER JOIN
        sessions ON (
          sessions.token = ${token} AND
          sessions.expiry_timestamp > now()
          -- sessions.vendor_id = products.vendor_id
        )
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return vendors;
  },
);

export const getVendorWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [vendor] = await sql<VendorWithPasswordHash[]>`
SELECT * FROM
  vendors
WHERE
  vendors.username = ${username}`;
    return vendor;
  },
);

export const getVendorByUsername = cache(async (username: string) => {
  const [vendor] = await sql<Vendor[]>`
SELECT
  id,
  username,
  shopname,
  email,
  bio
FROM
  vendors
WHERE
  vendors.username = ${username.toLowerCase()}`;
  return vendor;
});

// creating new vendors
export const createVendor = cache(
  async (
    username: string,
    shopname: string,
    email: string,
    passwordHash: string,
    bio: string,
  ) => {
    const [vendor] = await sql<Vendor[]>`
    INSERT INTO vendors
      (username, shopname, email, password_hash, bio)
    VALUES
      (${username.toLowerCase()}, ${shopname}, ${email}, ${passwordHash}, ${bio})
    RETURNING
      id,
      shopname,
      email,
      username,
      bio
 `;
    return vendor;
  },
);

export const updateVendorById = cache(
  async (id: number, username: string, bio: string) => {
    await sql`
      UPDATE vendors
      SET
      username = ${username},
      bio = ${bio}
      WHERE
        id = ${id};
    `;
  },
);

export const getVendorBySessionToken = cache(async (token: string) => {
  const [vendor] = await sql<Vendor[]>`
  SELECT
    vendors.id,
    vendors.username,
    vendors.shopname,
    vendors.email,
    vendors.bio,
  FROM
    vendors
  INNER JOIN
    sessions ON (
      sessions.token = ${token} AND
      sessions.vendor_id = vendors.id AND
      sessions.expiry_timestamp > now()
    )
  `;

  return vendor;
});

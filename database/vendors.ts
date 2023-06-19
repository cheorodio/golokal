import { cache } from 'react';
import { Vendor } from '../migrations/1687100213-createVendors';
import { sql } from './connect';

export type VendorWithPasswordHash = Vendor & {
  passwordHash: string;
};

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
  email
FROM
  vendors
WHERE
  vendors.username = ${username.toLowerCase()}`;
  return vendor;
});

// creating new users
export const createVendor = cache(
  async (
    username: string,
    shopname: string,
    email: string,
    passwordHash: string,
  ) => {
    const [vendor] = await sql<Vendor[]>`
    INSERT INTO vendors
      (username, shopname, email, password_hash)
    VALUES
      (${username.toLowerCase()}, ${shopname}, ${email}, ${passwordHash})
    RETURNING
      id,
      shopname,
      email,
      username
 `;

    return vendor;
  },
);

export const getVendorBySessionToken = cache(async (token: string) => {
  const [vendor] = await sql<Vendor[]>`
  SELECT
    vendors.id,
    vendors.username,
    vendors.shopname,
    vendors.email
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

import { cache } from 'react';
import { Vendor } from '../migrations/1687100213-createVendors';
import { sql } from './connect';

export type VendorWithPasswordHash = Vendor & {
  passwordHash: string;
};

type CreateVendor = {
  id: number;
  username: string;
  shopname: string;
  email: string;
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

export const getVendorWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [vendor] = await sql<VendorWithPasswordHash[]>`
SELECT * FROM
  vendors
WHERE
  vendors.username = ${username.toLowerCase()}
`;
    return vendor;
  },
);

// dynamic routing to individual vendor page
// export const getVendorByShopname = cache(async (shopname: string) => {
//   const [vendor] = await sql<Vendor[]>`
// SELECT
//   id,
//   first_name,
//   username,
//   shopname,
//   email,
//   website_link,
//   bio
// FROM
//   vendors
// WHERE
//   vendors.shopname = ${shopname.toLowerCase().replaceAll(' ', '')}`;
//   return vendor;
// });

// Registering a vendor account
export const getVendorByUsername = cache(async (username: string) => {
  const [vendor] = await sql<CreateVendor[]>`
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

// creating new vendors
export const createVendor = cache(
  async (
    username: string,
    shopname: string,
    email: string,
    passwordHash: string,
  ) => {
    const [vendor] = await sql<CreateVendor[]>`
    INSERT INTO vendors
      (username, shopname, email, password_hash)
    VALUES
      (${username.toLowerCase()}, ${shopname}, ${email}, ${passwordHash})
    RETURNING
      id,
      username,
      shopname,
      email
 `;
    return vendor;
  },
);

export const getVendorBySessionToken = cache(async (token: string) => {
  const [vendor] = await sql<CreateVendor[]>`
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

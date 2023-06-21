import { cache } from 'react';
// import { Vendor } from '../migrations/1687100213-createVendors';
import { sql } from './connect';

type VendorWithPasswordHash = {
  id: number;
  username: string;
  shopname: string;
  email: string;
  passwordHash: string;
  firstName: string | null;
  websiteLink: string | null;
  bio: string | null;
  image: string | null;
};

type CreateVendor = {
  id: number;
  username: string;
  shopname: string;
  email: string;
};

type VendorProfile = CreateVendor & {
  id: number;
  firstName: string | null;
  websiteLink: string | null;
  bio: string | null;
  image: string | null;
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
// ///////////////////////////////////////////////
// editting vendor profile
export const getVendorById = cache(async (id: number) => {
  const [vendor] = await sql<VendorProfile[]>`
SELECT
  id,
  first_name,
  username,
  shopname,
  email,
  website_link,
  bio,
  image
FROM
  vendors
WHERE
  vendors.id = ${id}`;
  return vendor;
});

// ///////////////////////////////////////////////
// dynamic routing to individual vendor page
export const getVendorByUsername = cache(async (username: string) => {
  const [vendor] = await sql<VendorProfile[]>`
SELECT
  id,
  first_name,
  username,
  shopname,
  email,
  website_link,
  bio,
  image
FROM
  vendors
WHERE
  vendors.username = ${username}`;
  return vendor;
});

// REGISTERING A NEW VENDOR //////////////////////////////////////////////////////////
// 1. verify if the username is already taken when registering
// imported in vendorRegister route
export const verifyVendorByUsername = cache(async (username: string) => {
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

// 2. when verified that the username is not already taken, proceed to creating a new vendor
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

// VENDOR LOGIN //////////////////////////////////////////////////////////
// verifying the vendor credentials when logging in
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

// //////////////////////////////////////////////////////////
// get all the vendor only if a valid session token is passed
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

// //////////////////////////////////////////////////////////
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

// //////////////////////////////////////////////////////////
// updating vendor profile page
export const updateVendorById = cache(
  async (
    id: number,
    username: string,
    shopname: string,
    email: string,
    firstName: string,
    websiteLink: string,
    bio: string,
    image: string,
  ) => {
    const [vendor] = await sql<VendorWithPasswordHash[]>`
      UPDATE vendors
      SET
        username = ${username},
        shopname = ${shopname},
        email = ${email},
        first_name = ${firstName || null},
        website_link = ${websiteLink || null},
        bio = ${bio || null},
        image = ${image || null}
      WHERE
        id = ${id}
        RETURNING *
    `;
    return vendor;
  },
);

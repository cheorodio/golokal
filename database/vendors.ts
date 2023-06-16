import { cache } from 'react';
import { Vendors } from '../migrations/1686775216-createVendorTable';
import { sql } from './connect';

export const getVendors = cache(async () => {
  const vendors1 = await sql<Vendors[]>`
  SELECT * FROM vendors;`;
  return vendors1;
});

export const getVendorById = cache(async (name: string) => {
  const vendors = await sql<Vendors[]>`
  SELECT
    *
  FROM
    vendors
  WHERE
    name = ${name}`;
  return vendors[0];
});

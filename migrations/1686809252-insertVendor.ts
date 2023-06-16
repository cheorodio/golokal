import { Sql } from 'postgres';

export const vendors = [
  {
    id: 1,
    name: 'Lisa',
    shopName: 'vidaShop',
    bio: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    website: 'www.vidashop.com',
  },
  {
    id: 2,
    name: 'Tony',
    shopName: 'the_soap_company',
    bio: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
    website: 'www.thesoapcompany.com',
  },
  {
    id: 3,
    name: 'Liz',
    shopName: 'lumaShop',
    bio: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum',
    website: 'www.lumashop.com',
  },
  {
    id: 4,
    name: 'Kate',
    shopName: 'company_name',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    website: 'www.companyname.com',
  },
];

export async function up(sql: Sql) {
  for (const vendor of vendors) {
    await sql`
INSERT INTO vendors
  (name, shop_name, bio)
VALUES
  (${vendor.name}, ${vendor.shopName}, ${vendor.bio})
  `;
  }
}

export async function down(sql: Sql) {
  for (const vendor of vendors) {
    await sql`
    DELETE FROM vendors WHERE id = ${vendor.id}
  `;
  }
}

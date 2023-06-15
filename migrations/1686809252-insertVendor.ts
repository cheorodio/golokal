import { Sql } from 'postgres';

export const vendors = [
  {
    id: 1,
    name: 'Lisa',
    shopName: 'vidaShop',
    bio: 'This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes. ',
    alt: 'akjhdjka',
  },
  {
    id: 2,
    name: 'Tony',
    shopName: 'the_soap_company',
    bio: 'This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes. ',
  },
  {
    id: 3,
    name: 'Liz',
    shopName: 'lumaShop',
    bio: 'This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes. ',
  },
  {
    id: 4,
    name: 'Kate',
    shopName: 'company_name',
    bio: 'This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes. This is a quick intro about Lisa and products that she makes. ',
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

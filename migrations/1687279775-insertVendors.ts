import { Sql } from 'postgres';

export const vendors = [
  {
    id: 1,
    username: 'michelle',
    shopname: 'vida',
    email: 'vida@email.com',
    password_hash: 'asdfghjkl',
    first_name: 'Michelle',
    website_link: 'www.vida.com',
    bio: 'Hi my name is Michelle and I make jewellery.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 2,
    username: 'tina',
    shopname: 'theCandleShop',
    email: 'candle@email.com',
    password_hash: 'asdfghjkl',
    first_name: 'Tine',
    website_link: 'www.thecandleshop.com',
    bio: 'Hi my name is Tina and I make candles.',
    image:
      'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 3,
    username: 'tony',
    shopname: 'soapShop',
    email: 'sopashop@email.com',
    password_hash: 'asdfghjkl',
    first_name: 'Tony',
    website_link: 'www.soapshop.com',
    bio: 'Hi my name is Tony and I make soap.',
    image:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 4,
    username: 'Kat',
    shopname: 'luluShop',
    email: 'luluShop@email.com',
    password_hash: 'asdfghjkl',
    first_name: 'Kat',
    website_link: 'www.lulushop.com',
    bio: 'Hi my name is Kat and I make ceramics.',
    image:
      'https://images.unsplash.com/photo-1589156215870-a324614b3fff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxhY2slMjBnaXJsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  },
];

export async function up(sql: Sql) {
  for (const vendor of vendors) {
    await sql`
    INSERT INTO vendors
      (username, shopname, email, password_hash, first_name, website_link, bio)
    VALUES
      (${vendor.username}, ${vendor.shopname}, ${vendor.email}, ${vendor.password_hash}, ${vendor.first_name}, ${vendor.website_link}, ${vendor.bio})
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

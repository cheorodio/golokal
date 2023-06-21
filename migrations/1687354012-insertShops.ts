import { Sql } from 'postgres';

export const shops = [
  {
    id: 1,
    name: 'vida',
    description:
      'Welcome to Vida, where passion and artistry come together to create exquisite handmade jewelry. At Vida, we believe that jewelry is more than just an accessory—it is an expression of individuality, a reflection of style, and a symbol of cherished moments.',
    websiteUrl: null,
    location: 'Vienna',
    shopImageId: null,
  },
  {
    id: 2,
    name: 'luluShop',
    description:
      'Welcome to luluShop, your haven for exquisite handmade candles! Nestled in the heart of our community, we take great pride in offering you a diverse collection of artisanal candles that will illuminate your world with warmth and beauty.',
    websiteUrl: 'www.luluShop.co',
    location: 'Vienna',
    shopImageId: null,
  },
];

export async function up(sql: Sql) {
  for (const shop of shops) {
    await sql`
    INSERT INTO shops
      (name, description, website_url, location, shop_image_id)
    VALUES
      (${shop.name}, ${shop.description}, ${shop.websiteUrl}, ${shop.location}, ${shop.shopImageId})
  `;
  }
}

export async function down(sql: Sql) {
  for (const shop of shops) {
    await sql`
      DELETE FROM shops WHERE id = ${shop.id}
  `;
  }
}

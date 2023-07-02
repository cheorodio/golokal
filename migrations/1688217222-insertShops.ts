import { Sql } from 'postgres';

export const shops = [
  {
    id: 1,
    name: 'vida',
    description:
      'Hi, welcome to Vida. My name is Taylor and I make jewellery using polymer clay',
    websiteUrl: 'www.vidajewellery.com',
    location: 'Vienna',
    imageUrl: '/images/vida.jpg',
    userId: 1,
  },
  {
    id: 2,
    name: 'luluShop',
    description:
      'Hello there! My name is Sina and this is my shop, luluShop. I make handpoured candles using only soy wax and 100% essential oils',
    websiteUrl: 'www.luluShop.com',
    location: 'Vienna',
    imageUrl: '/images/lulushop.jpg',
    userId: 2,
  },
  {
    id: 3,
    name: 'keramiks',
    description:
      "Hi, I'm Tony. This is my shop, keramiks. I make cute and stylish cups",
    websiteUrl: 'www.keramiks.com',
    location: 'Vienna',
    imageUrl: '/images/keramiks.jpg',
    userId: 3,
  },
  {
    id: 4,
    name: 'The Soap Company',
    description:
      "Hi there, I'm Lana. This is my shop, the soap company. I make organic body soap.",
    websiteUrl: 'www.thesoapcompany.com',
    location: 'Vienna',
    imageUrl: '/images/thesoapcompany.jpg',
    userId: 4,
  },
];

export async function up(sql: Sql) {
  for (const shop of shops) {
    await sql`
    INSERT INTO shops
      (name, description, website_url, location, image_url, user_id)
    VALUES
      (${shop.name}, ${shop.description}, ${shop.websiteUrl}, ${shop.location}, ${shop.imageUrl}, ${shop.userId})
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

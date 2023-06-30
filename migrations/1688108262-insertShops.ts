import { Sql } from 'postgres';

export const shops = [
  {
    id: 1,
    name: 'vida',
    description:
      'Welcome to Vida, where passion and artistry come together to create exquisite handmade jewelry. At Vida, we believe that jewelry is more than just an accessory—it is an expression of individuality, a reflection of style, and a symbol of cherished moments.',
    websiteUrl: 'www.vidajewellery.com',
    location: 'Vienna',
    imageUrl: '/images/vida.jpg',
    userId: 1,
  },
  {
    id: 2,
    name: 'luluShop',
    description:
      'Welcome to luluShop, your haven for exquisite handmade candles! Nestled in the heart of our community, we take great pride in offering you a diverse collection of artisanal candles that will illuminate your world with warmth and beauty.',
    websiteUrl: 'www.luluShop.com',
    location: 'Vienna',
    imageUrl: '/images/lulushop.jpg',
    userId: 2,
  },
  {
    id: 3,
    name: 'keramiks',
    description:
      'Welcome to Keramiks, your online haven for exquisite handmade ceramics that blend artistry and functionality! At Keramiks, we are passionate about the beauty and craftsmanship of handmade ceramics, and we take great pride in curating a collection that will add a touch of elegance to your home.',
    websiteUrl: 'www.keramiks.com',
    location: 'Vienna',
    imageUrl: '/images/keramiks.jpg',
    userId: 3,
  },
  {
    id: 4,
    name: 'The Soap Company',
    description:
      'Welcome to The Soap Company, your ultimate online destination for luxurious, handcrafted soaps that transform your daily bathing ritual into a pampering experience! At The Soap Company, we are dedicated to crafting exceptional soaps that are not only gentle on your skin but also a feast for the senses. ',
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

import { Sql } from 'postgres';

export const products = [
  {
    id: 1,
    name: 'Ocean',
    category: 'Candles',
    description:
      'Introducing our exquisite hand-poured ocean-scented candles, crafted to bring the refreshing essence of the sea into your living space. Immerse yourself in the tranquil atmosphere of coastal serenity with every flicker of our artisanal candles.',
    imageUrl: '/images/products/candle.jpg',
    shopId: 2,
  },
  {
    id: 2,
    name: 'Christmas',
    category: 'Candles',
    description:
      'Introducing our enchanting hand-poured Christmas-scented candles, meticulously crafted to infuse your home with the nostalgic and heartwarming aromas of the holiday season. Immerse yourself in the magical ambiance of Christmas with every flicker of our artisanal candles.',
    imageUrl: '/images/products/candle.jpg',
    shopId: 2,
  },
  {
    id: 3,
    name: 'Lana',
    category: 'Earrings',
    description:
      'Elevate your style and embrace a touch of elegance with the exquisite "Lana" Handmade Earrings. Meticulously crafted with passion and creativity, these earrings are a true testament to the beauty of handcrafted jewelry.',
    imageUrl: '/images/products/jewellery.jpg',
    shopId: 1,
  },
  {
    id: 4,
    name: 'Kyut',
    category: 'Cups',
    description:
      "Handcrafted with utmost care, our cups are made from high-quality ceramic or porcelain materials, ensuring durability and a luxurious feel. The smooth surfaces and delicate curves of the cups are a result of the artisan's dedication to perfection, creating a sensory experience with every sip.",
    imageUrl: '/images/products/ceramics.jpg',
    shopId: 3,
  },
  {
    id: 5,
    name: 'Lavender',
    category: 'Soap',
    description:
      'Transform your daily bathing routine into a moment of indulgence with our exquisite Handmade Soap collection. Crafted with love and care, each soap is a work of art, designed to nourish your skin and elevate your senses.',
    imageUrl: '/images/products/soap.jpg',
    shopId: 3,
  },
];

export async function up(sql: Sql) {
  for (const product of products) {
    await sql`
    INSERT INTO products
      (name, category, description, image_url, shop_id)
    VALUES
      (${product.name}, ${product.category}, ${product.description}, ${product.imageUrl}, ${product.shopId})
  `;
  }
}

export async function down(sql: Sql) {
  for (const product of products) {
    await sql`
      DELETE FROM products WHERE id = ${product.id}
  `;
  }
}

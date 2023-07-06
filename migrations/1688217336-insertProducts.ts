import { Sql } from 'postgres';

export const products = [
  {
    id: 1,
    userId: 2,
    shopId: 2,
    name: 'Ocean',
    category: 'Candles',
    description:
      'Introducing our exquisite hand-poured ocean-scented candles, crafted to bring the refreshing essence of the sea into your living space. Immerse yourself in the tranquil atmosphere of coastal serenity with every flicker of our artisanal candles.',
    imageUrl: '/images/products/candle.jpg',
  },
  {
    id: 2,
    userId: 2,
    shopId: 2,
    name: 'Christmas',
    category: 'Candles',
    description:
      'Introducing our enchanting hand-poured Christmas-scented candles, meticulously crafted to infuse your home with the nostalgic and heartwarming aromas of the holiday season. Immerse yourself in the magical ambiance of Christmas with every flicker of our artisanal candles.',
    imageUrl: '/images/products/candle2.jpg',
  },
  {
    id: 3,
    userId: 1,
    shopId: 1,
    name: 'Lana',
    category: 'Jewelleries',
    description:
      'Elevate your style and embrace a touch of elegance with the exquisite "Lana" Handmade Earrings. Meticulously crafted with passion and creativity, these earrings are a true testament to the beauty of handcrafted jewelry.',
    imageUrl: '/images/products/jewellery.jpg',
  },
  {
    id: 4,
    userId: 3,
    shopId: 3,
    name: 'Kyut',
    category: 'Ceramics',
    description:
      "Handcrafted with utmost care, our cups are made from high-quality ceramic or porcelain materials, ensuring durability and a luxurious feel. The smooth surfaces and delicate curves of the cups are a result of the artisan's dedication to perfection, creating a sensory experience with every sip.",
    imageUrl: '/images/products/ceramics.jpg',
  },
  {
    id: 5,
    userId: 4,
    shopId: 4,
    name: 'Lavender',
    category: 'Soap',
    description:
      'Transform your daily bathing routine into a moment of indulgence with our exquisite Handmade Soap collection. Crafted with love and care, each soap is a work of art, designed to nourish your skin and elevate your senses.',
    imageUrl: '/images/products/soap.jpg',
  },
  {
    id: 6,
    userId: 1,
    shopId: 1,
    name: 'Sara',
    category: 'Jewelleries',
    description:
      'Elevate your style and embrace a touch of elegance with the exquisite "Lana" Handmade Earrings. Meticulously crafted with passion and creativity, these earrings are a true testament to the beauty of handcrafted jewelry.',
    imageUrl: '/images/products/sara.jpg',
  },
  {
    id: 7,
    userId: 1,
    shopId: 1,
    name: 'helen',
    category: 'Jewelleries',
    description:
      'Elevate your style and embrace a touch of elegance with the exquisite "Lana" Handmade Earrings. Meticulously crafted with passion and creativity, these earrings are a true testament to the beauty of handcrafted jewelry.',
    imageUrl: '/images/products/helen.jpg',
  },
  {
    id: 8,
    userId: 1,
    shopId: 1,
    name: 'kate',
    category: 'Jewelleries',
    description:
      'Elevate your style and embrace a touch of elegance with the exquisite "Lana" Handmade Earrings. Meticulously crafted with passion and creativity, these earrings are a true testament to the beauty of handcrafted jewelry.',
    imageUrl: '/images/products/kate.jpg',
  },
  {
    id: 9,
    userId: 1,
    shopId: 1,
    name: 'lola',
    category: 'Jewelleries',
    description:
      'Elevate your style and embrace a touch of elegance with the exquisite "Lana" Handmade Earrings. Meticulously crafted with passion and creativity, these earrings are a true testament to the beauty of handcrafted jewelry.',
    imageUrl: '/images/products/lola.jpg',
  },
  {
    id: 10,
    userId: 1,
    shopId: 1,
    name: 'tina',
    category: 'Jewelleries',
    description:
      'Elevate your style and embrace a touch of elegance with the exquisite "Lana" Handmade Earrings. Meticulously crafted with passion and creativity, these earrings are a true testament to the beauty of handcrafted jewelry.',
    imageUrl: '/images/products/tina.jpg',
  },
  {
    id: 11,
    userId: 3,
    shopId: 3,
    name: 'Cups',
    category: 'Ceramics',
    description:
      "Handcrafted with utmost care, our cups are made from high-quality ceramic or porcelain materials, ensuring durability and a luxurious feel. The smooth surfaces and delicate curves of the cups are a result of the artisan's dedication to perfection, creating a sensory experience with every sip.",
    imageUrl: '/images/products/ceramics2.jpg',
  },
  {
    id: 12,
    userId: 4,
    shopId: 4,
    name: 'Lily',
    category: 'Soap',
    description:
      'Transform your daily bathing routine into a moment of indulgence with our exquisite Handmade Soap collection. Crafted with love and care, each soap is a work of art, designed to nourish your skin and elevate your senses.',
    imageUrl: '/images/products/soap2.jpg',
  },
  {
    id: 13,
    userId: 4,
    shopId: 4,
    name: 'Rose',
    category: 'Soap',
    description:
      'Transform your daily bathing routine into a moment of indulgence with our exquisite Handmade Soap collection. Crafted with love and care, each soap is a work of art, designed to nourish your skin and elevate your senses.',
    imageUrl: '/images/products/soap1.jpg',
  },
];

export async function up(sql: Sql) {
  for (const product of products) {
    await sql`
    INSERT INTO products
      (name, user_id, shop_id, category, description, image_url)
    VALUES
      (${product.name}, ${product.userId}, ${product.shopId}, ${product.category}, ${product.description}, ${product.imageUrl})
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

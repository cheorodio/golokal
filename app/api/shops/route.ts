import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createShop } from '../../../database/shops';
import { Shop } from '../../../migrations/1687353857-createTableShops';

export type Error = {
  error: string;
};

type ShopsResponseBodyPost = { shops: Shop[] } | Error;

const shopSchema = z.object({
  name: z.string(),
  description: z.string(),
  websiteUrl: z.string().optional(),
  location: z.string(),
  shopImageId: z.number(),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ShopsResponseBodyPost>> {
  const body = await request.json();

  // zod please verify the body matches my schema
  const result = shopSchema.safeParse(body);

  if (!result.success) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }
  // query the database to get all the animals
  const shop = await createShop(
    result.data.name,
    result.data.description,
    result.data.location,
  );

  if (!shop) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'Error creating the new shop',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    shop: shop,
  });
}

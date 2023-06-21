import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createShop } from '../../../database/shops';

export type Error = {
  error: string;
};

export type ShopsResponseBodyPost =
  | {
      shops: {
        id: number;
        name: string;
        description: string;
        location: string;
      };
    }
  | Error;

const shopSchema = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string(),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ShopsResponseBodyPost>> {
  const body = await request.json();

  // zod please verify the body matches my schema
  const result = shopSchema.safeParse(body);

  if (!result.success) {
    // zod send you details about the error
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }
  // query the database to get all the shops
  const shop = await createShop(
    result.data.name,
    result.data.description,
    result.data.location,
  );

  if (!shop) {
    // zod send you details about the error
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

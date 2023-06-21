import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { deleteShopById, updateShopById } from '../../../../database/shops';
import { Shop } from '../../../../migrations/1687353857-createTableShops';
import { Error } from '../../users/route';

type ShopResponseBodyDelete = { shop: Shop } | Error;
type ShopResponseBodyPut = { shop: Shop } | Error;

const shopSchema = z.object({
  name: z.string(),
  description: z.string(),
  websiteUrl: z.string(),
  location: z.string(),
  shopImageId: z.number(),
});

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<ShopResponseBodyDelete>> {
  const shopId = Number(params.shopId);

  if (!shopId) {
    return NextResponse.json(
      {
        error: 'Invalid shop id',
      },
      { status: 400 },
    );
  }
  // query the database to get all the shops
  const shop = await deleteShopById(shopId);

  if (!shop) {
    return NextResponse.json(
      {
        error: 'Shop Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ shop: shop });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<ShopResponseBodyPut>> {
  const shopId = Number(params.shopId);
  const body = await request.json();

  if (!shopId) {
    return NextResponse.json(
      {
        error: 'Invalid shop id',
      },
      { status: 400 },
    );
  }

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
  // query the database to update the shop
  const shop = await updateShopById(
    shopId,
    result.data.name,
    result.data.description,
    result.data.websiteUrl,
    result.data.location,
    result.data.shopImageId,
  );

  if (!shop) {
    return NextResponse.json(
      {
        error: 'Shop Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    shop: shop,
  });
}

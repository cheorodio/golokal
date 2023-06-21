import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getVendorById, updateVendorById } from '../../../../database/vendors';
import { Vendor } from '../../../../migrations/1687100213-createVendors';

type VendorInformation = Vendor & {
  firstName: string;
  bio: string;
  websiteLink: string;
  image: string;
};

export type Error = {
  error: string;
};

type VendorsResponseBodyGet = { vendor: Vendor[] } | Error;
type VendorsResponseBodyPut = { vendor: VendorInformation[] } | Error;

const vendorSchema = z.object({
  username: z.string(),
  firstName: z.string(),
  shopname: z.string(),
  email: z.string(),
  bio: z.string(),
  websiteLink: z.string(),
  image: z.string(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<VendorsResponseBodyGet>> {
  const vendorId = Number(params.vendorId);

  if (!vendorId) {
    return NextResponse.json({ error: 'Invalid vendor id' }, { status: 400 });
  }

  // query the db to get all the vendors
  const vendor = await getVendorById(vendorId);

  if (!vendor) {
    return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
  }

  return NextResponse.json({ vendor: vendor });
}

//  UPDATE VENDOR PROFILE
export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<VendorsResponseBodyPut>> {
  const vendorId = Number(params.vendorId);
  const body = await request.json();

  if (!vendorId) {
    return NextResponse.json({ error: 'Invalid vendor id' }, { status: 400 });
  }

  // zod to verify if the body matches the schema
  const result = vendorSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: 'Incomplete data' }, { status: 400 });
  }

  // query database to update profile
  const vendor = await updateVendorById(
    vendorId,
    result.data.firstName,
    result.data.username,
    result.data.shopname,
    result.data.email,
    result.data.bio,
    result.data.image,
    result.data.websiteLink,
  );

  if (!vendor) {
    return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
  }

  return NextResponse.json({ vendor: vendor });
}

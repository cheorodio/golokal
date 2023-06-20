import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getValidSessionByToken } from '../../../../database/sessions';
import { getVendorsWithLimitAndOffsetBySessionToken } from '../../../../database/vendors';
import { Vendor } from '../../../../migrations/1687100213-createVendors';

type VendorInformation = Vendor & {
  bio: string;
  website: string;
};

export type Error = {
  error: string;
};

type VendorsResponseBodyGet = { vendor: Vendor[] } | Error;
type VendorsResponseBodyPost = { vendor: VendorInformation[] } | Error;

const vendorSchema = z.object({
  username: z.string(),
  shopname: z.string(),
  email: z.string(),
  bio: z.string(),
  website: z.string(),
});

export async function GET(
  request: NextRequest,
): Promise<NextResponse<VendorsResponseBodyGet>> {
  const { searchParams } = new URL(request.url);

  // 1. get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the token has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) {
    return NextResponse.json(
      {
        error: 'session token is not valid',
      },
      { status: 401 },
    );
  }

  const limit = Number(searchParams.get('limit'));
  const offset = Number(searchParams.get('offset'));

  if (!limit || !offset) {
    return NextResponse.json(
      {
        error: 'Limit and Offset need to be passed as params',
      },
      { status: 400 },
    );
  }

  // query the database to get all the vendor only if a valid session token is passed
  const vendors = await getVendorsWithLimitAndOffsetBySessionToken(
    limit,
    offset,
    sessionTokenCookie.value,
  );

  return NextResponse.json({ vendors: vendors });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<VendorResponseBodyPost>> {
  const body = await request.json();

  // zod please verify the body matches my schema
  const result = vendorSchema.safeParse(body);

  if (!result.success) {
    // zod send you details about the error
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }

  const vendor = await updateVendorById(
    userId,
    result.data.nickname,
    result.data.description,
  );

  if (!user) {
    return NextResponse.json(
      {
        error: 'User Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    vendor: vendor,
  });
}

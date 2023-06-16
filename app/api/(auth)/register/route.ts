import { NextRequest, NextResponse } from 'next/server';
import { User } from '../../../../database/user';

type Error = {
  error: string;
};
type RegisterResponseBodyPost =
  | {
      user: User;
    }
  | Error;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  const body = await request.json();

  console.log(body);

  return NextResponse.json({ user: { id: 1, username: 'michelle' } });
}

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { getShopByUserId } from '../../../../database/shops';
import { getUserBySessionToken } from '../../../../database/users';

export const dynamic = 'force-dynamic';

export default async function MyShopPage() {
  // const shops = await getShops();

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!user) {
    return redirect(`/login?returnTo=/shops/my-shop`);
  }

  const myShop = await getShopByUserId(user.id);

  return (
    <div>
      {myShop.length === 0 ? (
        <p>You don't have a shop yet</p>
      ) : (
        <div>
          {myShop.map((shop) => {
            return (
              <div key={`shop-div-${shop.id}`}>
                <p>{shop.name}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* <MyShop myShop={myShop} user={user} /> */}
    </div>
  );
}

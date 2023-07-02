import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { getShopByUserId } from '../../../../database/shops';
import { getUserBySessionToken } from '../../../../database/users';
import styles from '../../../styles/shopsPage.module.scss';

export const dynamic = 'force-dynamic';

export default async function MyShopPage() {
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
    <div className={styles.myShopContainer}>
      {myShop.length === 0 ? (
        <div className={styles.noShopFoundMessage}>
          <p>You don't have a shop yet</p>
          <Link href="/shops/create-shop">
            <p>Click here to create one</p>
          </Link>
        </div>
      ) : (
        <div>
          {myShop.map((shop) => {
            return (
              <div key={`shop-div-${shop.id}`}>
                <Link href={`/shops/${shop?.id}`}>
                  <p>{shop.name}</p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

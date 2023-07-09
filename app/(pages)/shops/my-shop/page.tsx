import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { getShopByUserId } from '../../../../database/shops';
import { getUserBySessionToken } from '../../../../database/users';
import styles from '../../../styles/allShopsPage.module.scss';

export const metadata = {
  title: { default: 'Golokal | Join hundreds of local vendors on our site' },
  description:
    'At golokal, we are passionate about supporting artisans, craftsmen, and local businesses, and our platform serves as a virtual marketplace to showcase their unique creations.',
};

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
          <Link href="/shops/create-shop" className={styles.createShopLink}>
            <p>Click here to create one</p>
          </Link>
        </div>
      ) : (
        <div className={styles.shopContainer}>
          {myShop.map((shop) => {
            return (
              <div key={`shop-div-${shop.id}`} className={styles.shopCard}>
                <p className={styles.shopName}>{shop.name}</p>
                <Image
                  src={shop.imageUrl}
                  alt="Shop"
                  width={100}
                  height={100}
                  className={styles.shopImage}
                />
                <Link href={`/shops/${shop.id}`} className={styles.shopLink}>
                  Go to shop <BsArrowRight />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

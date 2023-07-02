import Image from 'next/image';
import Link from 'next/link';
import { getShops } from '../../../database/shops';
import styles from '../../styles/ShopsPage.module.scss';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { default: 'Golokal | Discover local vendors' },
  description:
    'At golokal, we are passionate about supporting artisans, craftsmen, and local businesses, and our platform serves as a virtual marketplace to showcase their unique creations.',
};

export default async function ShopsPage() {
  const shops = await getShops();

  return (
    <main className={styles.shopsPageContainer}>
      {/* <div className={styles.shopsPageTitle}>
        <h1>Discover local vendors on our site</h1>
      </div> */}
      <div className={styles.shopListContainer}>
        {shops.map((shop) => {
          return (
            <div key={`shop-div-${shop.id}`} className={styles.shopContainer}>
              <Link href={`/shops/${shop.id}`} className={styles.link}>
                <div className={styles.titleContainer}>
                  <p className={styles.shopName}>{shop.name}</p>
                  <p className={styles.shopLocation}>
                    Based in {shop.location}
                  </p>
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src={shop.imageUrl}
                    width={300}
                    height={300}
                    alt="Shop avatar"
                    className={styles.shopImage}
                  />
                </div>
                <div className={styles.shopBio}>
                  <p>{shop.description}</p>
                </div>
              </Link>
              {/* <div className={styles.top}>
                <div className={styles.imageBox}>
                  <Image
                    src={shop.imageUrl}
                    width={300}
                    height={300}
                    alt="Shop avatar"
                    className={styles.shopImage}
                  />
                </div>

                <div className={styles.shopNameContainer}>
                  <p className={styles.shopName}>{shop.name}</p>
                </div>

                <div className={styles.shopBio}>
                  <p>{shop.description}</p>
                </div>
              </div>
              <Link href={`/shops/${shop.id}`} className={styles.visitShopLink}>
                Visit Shop Page
              </Link> */}
            </div>
          );
        })}
      </div>
    </main>
  );
}

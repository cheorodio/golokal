import Link from 'next/link';
import { AiOutlineCamera } from 'react-icons/ai';
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
      <div className={styles.shopsPageTitle}>
        <h1>Discover local vendors on our site</h1>
      </div>
      <div className={styles.shopListContainer}>
        {shops.map((shop) => {
          return (
            <div key={`shop-div-${shop.id}`} className={styles.shopContainer}>
              <div className={styles.imageBox}>
                <AiOutlineCamera />
                {/* <Image href={shop.image} alt="shop" /> */}
              </div>
              <div className={styles.shopNameContainer}>
                <p className={styles.shopName}>{shop.name}</p>
                {/* <p className={styles.name}>{shop.name}</p> */}
              </div>
              <div className={styles.shopBio}>
                <p>{shop.description}</p>
              </div>
              <Link href={`/shops/${shop.id}`} className={styles.visitShopLink}>
                Visit Shop Page
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}

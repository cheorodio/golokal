import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../../../database/products';
import styles from '../../styles/shopsPage.module.scss';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { default: 'Golokal | Discover local vendors' },
  description:
    'At golokal, we are passionate about supporting artisans, craftsmen, and local businesses, and our platform serves as a virtual marketplace to showcase their unique creations.',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className={styles.shopsPageContainer}>
      <div className={styles.shopListContainer}>
        {products.map((product) => {
          return (
            <div
              key={`shop-div-${product.id}`}
              className={styles.shopContainer}
            >
              <Link href={`/shops/${product.id}`} className={styles.link}>
                <div className={styles.titleContainer}>
                  <p className={styles.shopName}>{product.name}</p>
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src={product.imageUrl}
                    width={300}
                    height={300}
                    alt="Shop avatar"
                    className={styles.shopImage}
                  />
                </div>
                <div>
                  <p>{product.description}</p>
                </div>
                <p>{product.category}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}

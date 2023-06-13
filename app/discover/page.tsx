import Image from 'next/image';
import Link from 'next/link';
import { products } from '../../database/products';
import styles from '../styles/discoverPage.module.scss';

export default function DiscoverPage() {
  return (
    <main className={styles.discoverSection}>
      <h1>Products</h1>
      <div className={styles.productsContainer}>
        {products.map((product) => {
          return (
            <div
              key={`product-div-${product.id}`}
              className={styles.productContainer}
            >
              <Link href="/">{product.company_name}</Link>
              <Link href="/">
                <Image
                  src={`/images/products/${product.name}.jpg`}
                  alt={product.alt}
                  width={200}
                  height={200}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}

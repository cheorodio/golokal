import Link from 'next/link';
import { getVendors } from '../../database/vendors';
import styles from '../styles/vendorsPage.module.scss';

export default async function DiscoverPage() {
  const vendors = await getVendors();
  return (
    <main className={styles.discoverSection}>
      <h1>Discover local vendors</h1>
      <div className={styles.productsContainer}>
        {vendors.map((vendor) => {
          return (
            <div
              key={`vendor-div-${vendor.id}`}
              className={styles.vendorContainer}
            >
              <div>
                <p className={styles.vendorName}>{vendor.username}</p>
                <p className={styles.vendorShop}>{vendor.shopname}</p>
              </div>
              <Link
                href={`/discover/${vendor.username}`}
                className={styles.visitVendorLink}
              >
                visit profile
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}

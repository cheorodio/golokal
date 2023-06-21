import Image from 'next/image';
import Link from 'next/link';
// import { AiOutlineCamera } from 'react-icons/ai';
import { getVendors } from '../../../database/vendors';
import styles from '../../styles/DiscoverVendorsPage.module.scss';

export default async function DiscoverVendorsPage() {
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
              <div className={styles.imageBox}>
                {/* <AiOutlineCamera /> */}
                <Image href={vendor.image} alt="vendor" />
              </div>
              <div>
                <p className={styles.vendorShop}>{vendor.shopname}</p>
                <p className={styles.vendorName}>{vendor.username}</p>
              </div>
              <div>
                <p>{vendor.bio}</p>
              </div>
              <Link
                href={`/vendor/${vendor.username}`}
                className={styles.visitVendorLink}
              >
                visit vendor profile
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}

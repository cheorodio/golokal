// import Image from 'next/image';
// import Link from 'next/link';
// import { getVendors } from '../../database/vendors';
import styles from './discoverPage.module.scss';

export default async function DiscoverPage() {
  // const vendors = await getVendors();
  return (
    <main className={styles.discoverSection}>
      <h1>Discover local vendors</h1>
      <div className={styles.productsContainer}>
        {/* {vendors.map((vendor) => {
          return (
            <div
              key={`vendor-div-${vendor.id}`}
              className={styles.vendorContainer}
            >
              <Image
                className={styles.vendorImage}
                src={`/images/vendors/${vendor.name}.jpg`}
                alt=""
                width={280}
                height={300}
              />
              <div>
                <p className={styles.vendorName}>{vendor.name}</p>
                <p className={styles.vendorShop}>{vendor.shopName}</p>
              </div>
              <p className={styles.vendorBio}>{vendor.bio}</p>
              <Link
                href={`/discover/${vendor.name}`}
                className={styles.visitVendorLink}
              >
                visit profile
              </Link>
            </div>
          );
        })} */}
      </div>
    </main>
  );
}

import Image from 'next/image';
import Link from 'next/link';
// import { AiOutlineHeart, AiOutlineStar, AiTwotoneShop } from 'react-icons/ai';
import { vendors } from '../../database/vendors';
import styles from '../styles/discoverPage.module.scss';

export default function DiscoverPage() {
  return (
    <main className={styles.discoverSection}>
      <h1>Discover local vendors</h1>
      <div className={styles.productsContainer}>
        {vendors.map((vendor) => {
          return (
            <div
              key={`product-div-${vendor.id}`}
              className={styles.vendorContainer}
            >
              <Image
                className={styles.vendorImage}
                src={`/images/products/${vendor.name}.jpg`}
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
                href="/"
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

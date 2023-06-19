import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AiOutlineCamera } from 'react-icons/ai';
import { getVendorByUsername } from '../../../database/vendors';
import styles from '../../styles/shopPage.module.scss';

type Props = {
  params: { username: string };
};

export default async function UserProfilePage({ params }: Props) {
  const vendor = await getVendorByUsername(params.username);

  if (!vendor) {
    notFound();
  }

  return (
    <main className={styles.shopPage}>
      <div className={styles.shopInfo}>
        <div className={styles.imageBox}>
          <AiOutlineCamera />
        </div>
        <div className={styles.moreInfo}>
          <div>
            <h1>{vendor.shopname}</h1>
            <button className={styles.followButton}>follow</button>
          </div>
          <Link href="/">www.shopname.com</Link>
          <p className={styles.shopBio}>
            Information about this shop and their products. Information about
            this shop and their products. Information about this shop and their
            products. Information about this shop and their products.
            Information about this shop and their products. Information about
            this shop and their products. Information about this shop and their
            products. Information about this shop and their products.
          </p>
        </div>
      </div>
      <div className={styles.productsFeed}>
        <h2>Products Feed</h2>
        <div className={styles.productsContainer}>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </main>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProducts } from '../../../../database/products';
import { getVendorByUsername } from '../../../../database/vendors';
import styles from '../../../styles/VendorProfilePage.module.scss';

type Props = {
  params: { username: string };
};

export default async function VendorProfilePage({ params }: Props) {
  const vendor = await getVendorByUsername(params.username);

  if (!vendor) {
    notFound();
  }
  const products = await getProducts();

  return (
    <main>
      <div className={styles.shopPage}>
        <div className={styles.shopInfo}>
          <div className={styles.imageBox}>
            <Image href={vendor.image} alt="vendor" />
            {/* <AiOutlineCamera /> */}
          </div>
          <div className={styles.moreInfo}>
            <h1>{vendor.shopname}</h1>
            <div>
              <Link href="/">www.shopname.com</Link>
              <button className={styles.followButton}>follow</button>
            </div>
            <p className={styles.shopBio}>{vendor.bio}</p>
          </div>
        </div>
        <div className={styles.productsFeed}>
          <h2>Products Feed</h2>
          <div className={styles.productsContainer}>
            {/* <DisplayProducts products={products} /> */}
            <div className={styles.productCardsContainer}>
              {products.map((product) => {
                return (
                  <div
                    key={`product-div-${product.id}`}
                    className={styles.productCard}
                  >
                    <h1>{product.name}</h1>
                    <p>{product.category}</p>
                    <p>{product.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

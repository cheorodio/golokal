// import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AiOutlineCamera } from 'react-icons/ai';
import { getShopByUsername } from '../../../../database/shops';
import styles from '../../../styles/SingleShopPage.module.scss';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { default: 'golokal | Discover local vendors' },
  description:
    'At golokal, we are passionate about supporting artisans, craftsmen, and local businesses, and our platform serves as a virtual marketplace to showcase their unique creations.',
};

type Props = {
  params: { username: string };
};

export default async function VendorProfilePage(props: Props) {
  const singleShop = await getShopByUsername(props.params.username);
  console.log({ singleShop });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!singleShop) {
    notFound();
  }
  // const shops = await getShops();

  return (
    <main>
      <div className={styles.shopPage}>
        <div className={styles.shopInfo}>
          <div className={styles.imageBox}>
            {/* <Image src={allShop.shopImageId} alt="vendor" /> */}
            <AiOutlineCamera />
          </div>
          <div className={styles.moreInfo}>
            <h1>{singleShop.name}</h1>
            <div>
              <Link href="/">{singleShop.websiteUrl}</Link>
              <button className={styles.followButton}>follow</button>
            </div>
            <p className={styles.shopBio}>{singleShop.description}</p>
          </div>
        </div>
        {/*
        <div className={styles.productsFeed}>
          <h2>Products Feed</h2>
          <div className={styles.productsContainer}>
            {/* <DisplayProducts products={products} /> */}
        {/* <div className={styles.productCardsContainer}>
              {shops.map((shop) => {
                return (
                  <div
                    key={`product-div-${shop.id}`}
                    className={styles.productCard}
                  >
                    <h1>{shop.name}</h1>
                    <p>{shop.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div> */}
      </div>
    </main>
  );
}

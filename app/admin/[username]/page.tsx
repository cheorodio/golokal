import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { AiOutlineCamera } from 'react-icons/ai';
import { getProducts } from '../../../database/products';
import { getValidSessionByToken } from '../../../database/sessions';
import { getVendorByUsername } from '../../../database/vendors';
import styles from '../../styles/shopPage.module.scss';
import AddProducts from './DisplayProducts';
import ProductsForm from './ProductsForm';

type Props = {
  params: { username: string };
};

export default async function UserProfilePage({ params }: Props) {
  const vendor = await getVendorByUsername(params.username);
  if (!vendor) {
    notFound();
  }

  // allowing access to only authorised user
  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) redirect(`/login?returnTo=/shop/${vendor.username}`);

  const products = await getProducts();

  return (
    <main>
      <div className={styles.shopPage}>
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
              this shop and their products. Information about this shop and
              their products. Information about this shop and their products.
              Information about this shop and their products. Information about
              this shop and their products. Information about this shop and
              their products. Information about this shop and their products.
            </p>
          </div>
        </div>
        <div className={styles.productsFeed}>
          <h2>Products Feed</h2>
          <div className={styles.productsContainer}>
            <AddProducts products={products} />
          </div>
        </div>
      </div>
      <div className={styles.addProducts}>
        <ProductsForm products={products} />
      </div>
    </main>
  );
}

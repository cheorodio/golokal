import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { AiOutlineCamera } from 'react-icons/ai';
import { getProducts } from '../../../../../database/products';
import { getUserBySessionToken } from '../../../../../database/sessions';
import { getShopByUsername } from '../../../../../database/shops';
import styles from '../../../../styles/SingleShopPage.module.scss';
import CreateProductsForm from './CreateProductsForm';

type Props = {
  params: { username: string };
};

export default async function ShopProfilePage({ params }: Props) {
  const shop = await getShopByUsername(params.username);
  if (!shop) {
    notFound();
  }

  // allowing access to only authorised admin
  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  // if (!session.userId === params.username)redirect(`/login?returnTo=/shop/${shop.username}`);

  if (!session) redirect(`/login?returnTo=/shop/${shop.username}`);

  // check if i am the user of this shop

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
              <h1>{shop.name}</h1>
              <button className={styles.followButton}>follow</button>
            </div>
            <Link href="/">www.shopname.com</Link>
            <p className={styles.shopBio}>{shop.description}</p>
          </div>
        </div>
        <div className={styles.productsFeed}>
          <h2>Products Feed</h2>
          <div className={styles.productsContainer}>
            {/* <AddProducts products={products} /> */}
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
      <div className={styles.addProducts}>
        <CreateProductsForm products={products} />
      </div>
    </main>
  );
}

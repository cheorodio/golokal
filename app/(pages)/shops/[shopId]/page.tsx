import { cookies } from 'next/headers';
// import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { AiOutlineCamera } from 'react-icons/ai';
import { VscLocation } from 'react-icons/vsc';
import {
  getFavouriteByUserId,
  getFavourites,
} from '../../../../database/favourites';
// import { getProducts } from '../../../../database/products';
import { getShopById } from '../../../../database/shops';
import { getUserById, getUserBySessionToken } from '../../../../database/users';
import styles from '../../../styles/SingleShopPage.module.scss';
import AddFavourites from './AddFavourites';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { default: 'golokal | Discover local vendors' },
  description:
    'At golokal, we are passionate about supporting artisans, craftsmen, and local businesses, and our platform serves as a virtual marketplace to showcase their unique creations.',
};

type Props = {
  params: {
    userId: string;
    shopId: string;
  };
};

export default async function VendorProfilePage(props: Props) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  const singleShop = await getShopById(Number(props.params.shopId));

  if (!user) {
    return redirect(`/login?returnTo=/shops/${props.params.shopId}`);
  }

  if (!singleShop) {
    notFound();
  }
  // const favouritedUser =
  //   sessionToken && (await getUserBySessionToken(sessionToken.value));

  // const favouritedShop = await getShopByUsername(props.params.username);

  // const favourites = await getFavourites(singleShop.id);
  const favourites = await getFavourites(singleShop.id);
  // const users = await getUserById(user.id);
  // const shops = await getShopById(user.id);

  // const getProductsList = await getProducts();
  return (
    <main>
      <div className={styles.shopPage}>
        <div className={styles.shopInfo}>
          <div className={styles.imageBox}>
            <AiOutlineCamera />
          </div>
          <div className={styles.moreInfo}>
            <h1>{singleShop.name}</h1>
            <div>
              <Link href="/">{singleShop.websiteUrl}</Link>
              <AddFavourites
                favourites={favourites}
                singleShop={singleShop}
                user={user}
              />
            </div>
            <p className={styles.shopBio}>{singleShop.description}</p>
            <p>
              <VscLocation /> {singleShop.location}
            </p>
          </div>
        </div>

        {/* <div className={styles.productsFeed}>
          <h2>Products Feed</h2>
          <div className={styles.productsContainer}>
            <div className={styles.productCardsContainer}>
              {getProductsList.map((product) => {
                return (
                  <div
                    key={`product-div-${product.id}`}
                    className={styles.productCard}
                  >
                    <div className={styles.imageBox}>
                      <AiOutlineCamera />
                    </div>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
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

import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { MdOutlineCategory } from 'react-icons/md';
import { VscLocation } from 'react-icons/vsc';
import { getCommentsWithUserInfo } from '../../../../database/comments';
import { getFavourites } from '../../../../database/favourites';
import { getProductsWithInfo } from '../../../../database/products';
import { getShopById } from '../../../../database/shops';
import { getUserBySessionToken } from '../../../../database/users';
import { Shop } from '../../../../migrations/1688217209-createTableShops';
import styles from '../../../styles/singleShopPage.module.scss';
import AddComments from './AddComments';
import AddFavourites from './AddFavourites';
import AddProductsForm from './AddProducts';
import LikeProduct from './LikeProducts';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { default: 'golokal | Discover local vendors' },
  description:
    'At golokal, we are passionate about supporting artisans, craftsmen, and local businesses, and our platform serves as a virtual marketplace to showcase their unique creations.',
  shortcut: '/favicon.ico',
};

type Props = {
  params: {
    userId: number;
    shopId: number;
    content: string;
    username: string;
  };
  comment: { id: number };
  user: { username: string };
  currentUser: { id: number };
  // shop: Shop;
};

export default async function SingleShopPage(props: Props) {
  const singleShop = await getShopById(Number(props.params.shopId));

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  if (!user) {
    return redirect(`/login?returnTo=/shops/${props.params.shopId}`);
  }

  if (!singleShop) {
    notFound();
  }

  // to allow users to favourite this shop
  const favourites = await getFavourites(user.id);

  // to get comments from users
  const userComments = await getCommentsWithUserInfo(singleShop.id);

  // display products from this shop
  const shopProducts = await getProductsWithInfo(singleShop.id);

  // const shopOwner = await getShopByUserId(props.params.userId);

  return (
    <main className={styles.topSection}>
      <div className={styles.shopPage}>
        <Image
          src="/images/shoppage-border.png"
          alt="border color"
          height={100}
          width={1000}
          className={styles.border}
        />
        <div className={styles.shopInfo}>
          <div className={styles.imageBox}>
            <Image
              src={singleShop.imageUrl}
              width={300}
              height={300}
              alt="Shop avatar"
              className={styles.singleShopImage}
            />
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

        {/* ************* PROOOOOODUCTS SECTION ************* */}
        <div className={styles.productsFeed}>
          <h2>Products Feed</h2>
          <div className={styles.productsContainer}>
            {shopProducts.map((product) => {
              return (
                <div
                  key={`product-div-${product.productId}`}
                  className={styles.productCard}
                >
                  <div className={styles.titleSection}>
                    <p className={styles.productTitle}>{product.productName}</p>
                    <LikeProduct />
                  </div>
                  <Image
                    src={product.productImageUrl}
                    width={100}
                    height={100}
                    alt="product"
                    className={styles.productImage}
                  />
                  <p className={styles.productDescription}>
                    {product.productDescription}
                  </p>
                  <p className={styles.productCategory}>
                    <MdOutlineCategory /> {product.productCategory}
                  </p>
                </div>
              );
            })}
          </div>
          {/* <AddProductsForm
            shopProducts={shopProducts}
            user={user}
            singShop={singleShop}
          /> */}
        </div>
      </div>

      {/* ************* COOOOOOMMENTS SECTION ************* */}
      <div className={styles.commentsSection}>
        <h2>What other users have been saying</h2>
        <div className={styles.commentsContainer}>
          {userComments.map((comment) => {
            return (
              <div
                key={`comment-div-${comment.commentId}`}
                className={styles.singleCommentCard}
              >
                <div className={styles.userImage}>
                  <img
                    src={comment.userImageUrl}
                    height={60}
                    width={60}
                    style={{ borderRadius: '50%' }}
                    alt="user avatar"
                  />
                </div>
                <div className={styles.comments}>
                  <Link href={`/${comment.userName}`}>
                    <h5> {comment.userName} </h5>
                  </Link>
                  <p className={styles.commentContent}>
                    {comment.commentContent}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.commentInput}>
          <AddComments
            shop={singleShop}
            user={user}
            userComments={userComments}
          />
        </div>
      </div>

      {/* ************* PRODUCTS FORM SECTION ************* */}
      <div>
        <AddProductsForm
          singleShop={singleShop}
          user={user}
          shop={singleShop}
        />
      </div>
    </main>
  );
}

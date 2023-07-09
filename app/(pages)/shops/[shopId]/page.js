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
import { domine } from '../../../layout';
import styles from '../../../styles/shopPage.module.scss';
import AddComments from './AddComments';
import AddFavourites from './AddFavourites';
import AddProductsForm from './AddProducts';
import LikeProduct from './LikeProducts';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { default: 'Golokal | Vendor page' },
  description:
    'At golokal, we are passionate about supporting artisans, craftsmen, and local businesses, and our platform serves as a virtual marketplace to showcase their unique creations.',
};

export default async function SingleShopPage(props) {
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

  return (
    <main className={styles.mainSection}>
      <div className={styles.shopPage}>
        <div className={styles.shopInfo}>
          <h1 className={`${styles.shopHeader} ${domine.className}`}>
            {singleShop.name}
          </h1>
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
            <div className={styles.linkAndFollow}>
              <Link href="/">{singleShop.websiteUrl}</Link>

              {user.id !== singleShop.userId && (
                <AddFavourites
                  favourites={favourites}
                  singleShop={singleShop}
                  user={user}
                />
              )}
            </div>
            <p className={styles.shopBio}>{singleShop.description}</p>
            <p>
              <VscLocation /> {singleShop.location}
            </p>
          </div>
        </div>

        {/* ************* PRODUCTS SECTION ************* */}
        <div className={styles.productsFeed}>
          <h2 className={domine.className}>Products Feed</h2>
          <div className={styles.productsContainer}>
            {shopProducts.map((product) => {
              return (
                <div
                  key={`product-div-${product.productId}`}
                  className={styles.productCard}
                >
                  <div className={styles.titleSection}>
                    <p className={`${styles.productTitle} ${domine.className}`}>
                      {product.productName}
                    </p>
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
        </div>
      </div>

      <Image
        src="/images/shoppage-border.png"
        alt="border color"
        height={100}
        width={1000}
        className={styles.borderImage}
      />

      {/* ************* COMMENTS SECTION ************* */}
      <div className={styles.commentsSection}>
        <h2 className={domine.className}>What other users have been saying</h2>
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
                    <h4 className={domine.className}> {comment.userName} </h4>
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

      {/* ************* PRODUCTS FORM SECTION (for shop owner only)************* */}
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

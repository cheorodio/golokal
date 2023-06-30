import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { VscLocation } from 'react-icons/vsc';
import { getCommentsWithUserInfo } from '../../../../database/comments';
import { getFavourites } from '../../../../database/favourites';
import { getProductsWithInfo } from '../../../../database/products';
import { getShopById } from '../../../../database/shops';
import { getUserBySessionToken } from '../../../../database/users';
import styles from '../../../styles/SingleShopPage.module.scss';
import AddComments from './AddComments';
import AddFavourites from './AddFavourites';

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
};

export default async function SingleShopPage(props: Props) {
  const singleShop = await getShopById(Number(props.params.shopId));

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const shopOwner = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!shopOwner) {
    return redirect(`/login?returnTo=/shops/${props.params.shopId}`);
  }

  if (!singleShop) {
    notFound();
  }

  // to allow users to favourite this shop
  const favourites = await getFavourites(shopOwner.id);

  // to get comments from users
  const userComments = await getCommentsWithUserInfo(singleShop.id);

  // display products from this shop
  const shopProducts = await getProductsWithInfo(singleShop.id);

  return (
    <main className={styles.topSection}>
      <div className={styles.shopPage}>
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
                user={shopOwner}
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
          <div>
            {shopProducts.map((product) => {
              return (
                <div key={`product-div-${product.productId}`}>
                  <p>{product.productName}</p>
                  <p>{product.productDescription}</p>
                  <Image
                    src={product.productImageUrl}
                    width={100}
                    height={100}
                    alt="product"
                  />
                </div>
              );
            })}
          </div>
          {/*
          {shopOwner.username !== user?.username ? (
            <AddProductsToShop
              productsInShop={productsInShop}
              shop={singleShop}
              user={shopOwner}
            />
          ) : null} */}
        </div>
      </div>

      {/* ************* COOOOOOMMENTS SECTION ************* */}
      <div className={styles.commentsSection}>
        <h2>What other users have been saying</h2>
        <div className={styles.commentInput}>
          <AddComments
            shop={singleShop}
            user={shopOwner}
            userComments={userComments}
          />
        </div>

        <div className={styles.commentsContainer}>
          {userComments.map((comment) => {
            return (
              <div
                key={`comment-div-${comment.commentId}`}
                className={styles.singleCommentCard}
              >
                <div className={styles.userImage}>
                  <div>{comment.userName.charAt(0)}</div>
                </div>
                <div className={styles.comments}>
                  <Link href={`/${comment.userName}`}>
                    <h5> {comment.userName} </h5>
                  </Link>
                  <p>{comment.commentContent}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

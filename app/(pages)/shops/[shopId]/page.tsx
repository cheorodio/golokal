import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { VscLocation } from 'react-icons/vsc';
import { getCommentsWithUserInfo } from '../../../../database/comments';
import { getFavourites } from '../../../../database/favourites';
import { getProductByShopId } from '../../../../database/products';
import { getProductsInShopByShopId } from '../../../../database/productsInShop';
import { getShopById } from '../../../../database/shops';
import { getUserBySessionToken } from '../../../../database/users';
import styles from '../../../styles/SingleShopPage.module.scss';
import AddComments from './AddComments';
import AddFavourites from './AddFavourites';
import AddProductsToShop from './AddProducts';

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
  };
  comment: { id: number };
};

export default async function SingleShopPage(props: Props) {
  const singleShop = await getShopById(Number(props.params.shopId));

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

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
  const productsInShop = await getProductsInShopByShopId(singleShop.id);
  const products = await getProductByShopId(singleShop.id);

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
          <AddProductsToShop
            productsInShop={productsInShop}
            shop={singleShop}
            user={user}
          />
          <div>
            {productsInShop.map((product) => {
              return (
                <div key={`productsInShop-div${product.productId}`}>
                  <p>{product.productId}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ************* COOOOOOMMENTS SECTION ************* */}
      <div className={styles.commentsSection}>
        <h2>What other users have been saying</h2>
        <div className={styles.commentInput}>
          <AddComments
            shop={singleShop}
            user={user}
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

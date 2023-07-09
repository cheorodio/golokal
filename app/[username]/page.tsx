import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getFavouriteByUserId } from '../../database/favourites';
import { getUserBySessionToken, getUserByUsername } from '../../database/users';
import { User } from '../../migrations/1688217161-createTableUsers';
import { Favourite } from '../../migrations/1688217261-createTableFavourites';
import { domine } from '../layout';
import styles from '../styles/EditProfile.module.scss';
import DeleteFavourites from './DeleteFavourites';
import ProfilePage from './ProfilePage';

export const metadata = {
  title: { default: 'Golokal | Profile' },
  description:
    'At golokal, we are passionate about supporting artisans, craftsmen, and local businesses, and our platform serves as a virtual marketplace to showcase their unique creations.',
};

export type ProfilePageProps = {
  params: {
    username: string;
    currentUser: {
      username: string;
    };
    user: User;
    favourites: Favourite;
  };
};

export default async function UserProfilePage({ params }: ProfilePageProps) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const sessionToken = cookies().get('sessionToken');
  const currentUser = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!currentUser) {
    return redirect(`/login?returnTo=/${user.username}`);
  }

  const favourites = await getFavouriteByUserId(user.id);

  console.log({ favourites });

  return (
    <section className={styles.profileContainerBox}>
      <ProfilePage user={user} currentUser={currentUser} />
      <div className={styles.favouritesContainer}>
        <h1 className={domine.className}>
          {user.profileName}'s favourite shops
        </h1>
        {favourites.length === 0 ? (
          <p>Favourite is empty</p>
        ) : (
          <div className={styles.allCards}>
            {favourites.map((favourite: any) => {
              return (
                <div
                  key={`favourite-div-${favourite.shopId}`}
                  className={styles.favouriteShopCard}
                >
                  <Image
                    src={favourite.shopImageUrl}
                    width={100}
                    height={100}
                    alt="Shop image"
                    className={styles.shopImageUrl}
                  />
                  <div className={styles.infoSection}>
                    <h1>{favourite.shopName}</h1>
                    <Link
                      href={`/shops/${favourite.shopId}`}
                      className={`${styles.shopLink} ${domine.className}`}
                    >
                      View shop
                    </Link>
                    <DeleteFavourites
                      favourites={favourite.favouriteId}
                      currentUser={currentUser}
                      user={user}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

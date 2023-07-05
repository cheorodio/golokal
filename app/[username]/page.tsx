import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { VscLocation } from 'react-icons/vsc';
import { getFavouriteByUserId } from '../../database/favourites';
import { getUserBySessionToken, getUserByUsername } from '../../database/users';
import { User } from '../../migrations/1688217161-createTableUsers';
import { Favourite } from '../../migrations/1688217261-createTableFavourites';
import styles from '../styles/EditProfile.module.scss';
import DeleteFavourites from './DeleteFavourites';
import ProfilePage from './ProfilePage';

export type ProfilePageProps = {
  params: { username: string };
  currentUser: {
    username: string;
  };
  user: User;
  favourites: Favourite;
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

  return (
    <section className={styles.profileContainerBox}>
      <ProfilePage user={user} currentUser={currentUser} />
      <div className={styles.favouritesContainer}>
        <h1>{user.profileName}'s favourite shops</h1>
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
                  <Link
                    href={`/shops/${favourite.shopId}`}
                    className={styles.imageSection}
                  >
                    <Image
                      src={favourite.shopImageUrl}
                      width={100}
                      height={100}
                      alt="Shop image"
                      className={styles.shopImageUrl}
                    />
                  </Link>
                  <div className={styles.infoSection}>
                    <div>
                      <h1>{favourite.shopName}</h1>
                      <Link href="/">
                        <h4>{favourite.shopWebsiteUrl}</h4>
                      </Link>
                    </div>
                    <p className={styles.bio}>{favourite.shopDescription}</p>
                    <p className={styles.location}>
                      <VscLocation />
                      <span>{favourite.shopLocation}</span>
                    </p>
                  </div>
                  <DeleteFavourites
                    favourites={favourite}
                    currentUser={currentUser}
                    user={user}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

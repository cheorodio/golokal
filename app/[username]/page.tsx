import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getFavouriteByUserId } from '../../database/favourites';
import { getShopById } from '../../database/shops';
import {
  getUserById,
  getUserBySessionToken,
  getUserByUsername,
  getUsers,
} from '../../database/users';
import styles from '../styles/EditProfile.module.scss';
import EditProfile from './EditProfile';
import MyFavourites from './MyFavourites';

type Props = {
  params: {
    username: string;
    userId: number;
    shopId: number;
    favourites: any;
  };
};

export default async function UserProfilePage(props: Props) {
  const user = await getUserByUsername(props.params.username);

  const myUsers = await getUsers();
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
  const users = await getUserById(user.id);
  const shops = await getShopById(user.id);

  return (
    <section className={styles.profileContainerBox}>
      <EditProfile user={user} myUsers={myUsers} currentUser={currentUser} />
      <div className={styles.favouritesContainer}>
        <h1>{user.profileName}'s favourite shops</h1>
        {favourites.length === 0 ? (
          <p>Favourite is empty</p>
        ) : (
          <MyFavourites favourites={favourites} users={users} shops={shops} />
        )}
      </div>
    </section>
  );
}

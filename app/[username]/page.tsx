import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import {
  getUserBySessionToken,
  getUserByUsername,
  getUsers,
} from '../../database/users';
import styles from '../styles/EditProfile.module.scss';
import EditProfile from './EditProfile';

type Props = { params: { username: string; userId: number } };

export default async function UserProfilePage({ params }: Props) {
  const user = await getUserByUsername(params.username);
  const users = await getUsers();
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

  return (
    <section className={styles.profileContainerBox}>
      <EditProfile user={user} users={users} currentUser={currentUser} />
      <div className={styles.favouritesContainer} />
    </section>
  );
}

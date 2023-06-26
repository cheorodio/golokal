import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { AiOutlineCamera } from 'react-icons/ai';
// import { getUserBySessionToken } from '../../database/sessions';
import { getUserBySessionToken, getUserByUsername } from '../../database/users';
import styles from '../styles/profilePage.module.scss';

type Props = {
  params: { username: string };
};

export default async function UserProfilePage({ params }: Props) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!user) {
    notFound();
  }

  const singleUser = await getUserByUsername(params.username);

  if (!singleUser) {
    notFound();
  }

  return (
    <main className={styles.profilePage}>
      <div className={styles.profileInfo}>
        <div className={styles.imageBox}>
          <AiOutlineCamera />
        </div>
        <div className={styles.moreInfo}>
          <h1>{user.username}</h1>
          <p>
            Bio from this person. Bio from this person. Bio from this person.
            Bio from this person. Bio from this person. Bio from this person.
            Bio from this person. Bio from this person. Bio from this person.
            Bio from this person. Bio from this person. Bio from this person.
            Bio from this person. Bio from this person.
          </p>
        </div>
      </div>
      <div className={styles.followingVendors}>
        <h2>Favourite vendors</h2>
        <div className={styles.favouriteContainer}>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </main>
  );
}

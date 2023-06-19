import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../database/users';
import styles from '../../styles/profilePage.module.scss';

type Props = {
  params: { username: string };
};

export default async function UserProfilePage({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }
  return <div className={styles.profilePage}>Hello {user.username}</div>;
}

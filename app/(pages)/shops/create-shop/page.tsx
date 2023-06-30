import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../../database/sessions';
import { getShopById } from '../../../../database/shops';
import { getUserBySessionToken } from '../../../../database/users';
import styles from '../../../styles/CreateShopForm.module.scss';
import CreateShop from './CreateShop';

type Props = {
  params: { id: number };
};
export default async function CreateShopPage(props: Props) {
  const shops = await getShopById(Number(props.params.id));
  // allowing access to only authorised user
  const sessionToken = cookies().get('sessionToken');
  const session =
    sessionToken && (await getValidSessionByToken(sessionToken.value));

  if (!session) redirect(`/login?returnTo=/shops/create-shop`);

  const user = !sessionToken.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <main className={styles.createShopPage}>
      <div className={styles.pageTitle}>
        <h1>Hello {user?.username}</h1>
        <h4>
          Create an account now to showcase your amazing creations to our
          golokal community
        </h4>
      </div>
      <div className={styles.createShopFormContainer}>
        <CreateShop shops={shops} user={user} />
      </div>
    </main>
  );
}

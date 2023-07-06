import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../../database/sessions';
import { getShops } from '../../../../database/shops';
import { getUserBySessionToken } from '../../../../database/users';
import styles from '../../../styles/CreateShopForm.module.scss';
import CreateShop from './CreateShop';

export default async function CreateShopPage() {
  // allowing access to only authorised user
  const sessionToken = cookies().get('sessionToken');
  const session =
    sessionToken && (await getValidSessionByToken(sessionToken.value));

  if (!session) redirect(`/login?returnTo=/shops/create-shop`);

  const user = !sessionToken.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!user) {
    redirect('/login');
  }

  const userId = user.id;
  const shops = await getShops();
  const shop = shops.find((singleShop) => singleShop.userId === userId);

  return (
    <main className={styles.createShopPage}>
      <div className={styles.pageTitle}>
        <h1>
          Hello <span>{user.profileName}</span>
        </h1>
        <h4>
          Create an account now to showcase your amazing creations to our
          golokal community
        </h4>
      </div>
      <div className={styles.createShopFormContainer}>
        <CreateShop shops={shops} userId={userId} shop={shop} />
      </div>
    </main>
  );
}

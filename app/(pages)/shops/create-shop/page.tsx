import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../../database/sessions';
// import { getShopByUsername } from '../../../../database/shops';
import CreateShop from './CreateShop';

// type Props = { params: { username: string } };

export default async function CreateShopPage() {
  // const shop = await getShopByUsername(params.username);
  // if (!shop) {
  //   notFound();
  // }

  // allowing access to only authorised user
  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) redirect(`/login?returnTo=/shops/create-shop`);

  return (
    <main>
      <CreateShop />
    </main>
  );
}

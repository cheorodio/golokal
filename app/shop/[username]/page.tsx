import { notFound } from 'next/navigation';
import { getVendorByUsername } from '../../../database/vendors';
import styles from '../../styles/profilePage.module.scss';

type Props = {
  params: { username: string };
};

export default async function UserProfilePage({ params }: Props) {
  const vendor = await getVendorByUsername(params.username);

  if (!vendor) {
    notFound();
  }
  return (
    <div className={styles.profilePage}>
      hello {vendor.username}
      <br />
      Your shop is called {vendor.shopname}
    </div>
  );
}

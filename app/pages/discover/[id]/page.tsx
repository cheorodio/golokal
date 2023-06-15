// import Image from 'next/image';

import { notFound } from 'next/navigation';
import { getVendorById } from '../../../../database/vendors';
import styles from '../../../styles/vendorPage.module.scss';

export const dynamic = 'force-dynamic';

export default async function SingleVendorPage({ params }) {
  const singleVendor = await getVendorById(Number(params.id));

  if (!singleVendor) {
    notFound();
  }
  return (
    <main className={styles.vendorPageContainer}>
      <div className={styles.profileSide}>{/* <Image src={} alt="" /> */}</div>
    </main>
  );
}

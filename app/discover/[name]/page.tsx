import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getVendorById } from '../../../database/vendors';
import styles from './vendorPage.module.scss';

export const dynamic = 'force-dynamic';

type Props = {
  params: { name: string };
};

export default async function SingleVendorPage(props: Props) {
  const singleVendor = await getVendorById(props.params.name);

  if (!singleVendor) {
    notFound();
  }
  return (
    <main className={styles.vendorPageContainer}>
      <div className={styles.profileSide}>
        <Image
          src={`/images/vendors/${singleVendor.name}.jpg`}
          alt={singleVendor.name}
          className={styles.vendorImage}
          width={300}
          height={300}
        />

        <div className={styles.vendorInfo}>
          <h2>{singleVendor.name}</h2>
          <p>{singleVendor.shopName}</p>
        </div>

        <p className={styles.shopWebsite}>{singleVendor.website}</p>
        <div>{singleVendor.bio}</div>
      </div>

      <div className={styles.productSide}>
        <h1>Products Feed</h1>
        <div>
          <div />
          <div />
          <div />
          <div />
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

import Image from 'next/image';
import styles from '../../styles/vendorPage.module.scss';

export const dynamic = 'force-dynamic';

export default function SingleVendorPage() {
  return (
    <main className={styles.vendorPageContainer}>
      <div className={styles.profileSide}>
        <Image src={} alt="" />
      </div>
    </main>
  );
}

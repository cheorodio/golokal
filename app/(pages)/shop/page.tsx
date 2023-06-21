import Link from 'next/link';
import React from 'react';
import styles from '../../styles/ShopsPage.module.scss';

export default function ShopsPage() {
  return (
    <div className={styles.shopsPageContainer}>
      <Link href="/shop/registerShop">Create shop</Link>
    </div>
  );
}

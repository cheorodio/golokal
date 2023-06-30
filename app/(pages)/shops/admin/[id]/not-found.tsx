import Link from 'next/link';
import styles from '../../../../styles/rootPages.module.scss';

export const metadata = {
  title: 'Not Found',
  description: "sorry can't find the page you are looking for",
};

export default function ShopNotFound() {
  return (
    <div className={styles.shopNotFound}>
      You don't have a shop yet Click{' '}
      <Link href="/shops/create-shop">here</Link> to create one.
    </div>
  );
}

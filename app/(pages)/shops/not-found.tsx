import Link from 'next/link';
import styles from '../../styles/rootPages.module.scss';

export const metadata = {
  title: 'Not Found',
  description: "sorry can't find the page you are looking for",
};

export default function RootNotFound() {
  return (
    <div className={styles.notFounPage}>
      <p>You don't have a shop yet</p>
      <br />
      <Link href="/shops/create-shop">Click here to create one</Link>
    </div>
  );
}

import Link from 'next/link';
import styles from '../styles/NavFooter.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <Link href="/#" className={styles.logo}>
        GoLokal
      </Link>
      <div>
        <Link href="/">About</Link>
        <Link href="/">FAQ</Link>
      </div>
    </div>
  );
}

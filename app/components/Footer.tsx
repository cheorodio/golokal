import { Domine } from 'next/font/google';
import Link from 'next/link';
import styles from '../styles/Footer.module.scss';

const domine = Domine({
  subsets: ['latin'],
  display: 'swap',
});

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="/" className={domine.className}>
        GoLokal
      </Link>
      <div>
        <Link href="/about">About</Link>
        <Link href="/">FAQ</Link>
      </div>
    </footer>
  );
}

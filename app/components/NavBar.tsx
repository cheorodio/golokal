import Link from 'next/link';
import styles from './NavFooter.module.scss';

export default function NavBar() {
  return (
    <header className={styles.navigationBar}>
      <div className={styles.left}>
        <Link href="/#" className={styles.logo}>
          GoLokal
        </Link>
        <nav>
          <ul className={styles.navLinks}>
            <Link href="/">
              <li className={styles.navList}>Home</li>
            </Link>
            <Link href="/">
              <li className={styles.navList}>Discover</li>
            </Link>
            <Link href="/">
              <li className={styles.navList}>Vendors</li>
            </Link>
            <Link href="/">
              <li className={styles.navList}>About</li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className={styles.right}>
        <input className={styles.searchBar} placeholder="Search..." />
        <Link href="/" className={styles.loginButton}>
          login
        </Link>
      </div>
    </header>
  );
}

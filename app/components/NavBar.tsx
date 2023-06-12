'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { RxHamburgerMenu } from 'react-icons/rx';
import styles from './NavFooter.module.scss';

export default function NavBar() {
  const [navbarOpen, setNavbarOpen] = useState(true);

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

      <button
        className={styles.menuButton}
        onClick={() => setNavbarOpen((prev) => !prev)}
      >
        {navbarOpen ? (
          <RxHamburgerMenu className={styles.hamburgerIcon} />
        ) : (
          <CgClose className={styles.closeIcon} />
        )}
      </button>
    </header>
  );
}

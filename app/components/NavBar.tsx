'use client';
import Link from 'next/link';
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { RxHamburgerMenu } from 'react-icons/rx';
import styles from './navFooter.module.scss';

const links = [
  { id: 1, title: 'Home', link: '/' },
  { id: 2, title: 'Discover', link: '/discover' },
  { id: 3, title: 'About', link: '/about' },
  { id: 4, title: 'Blog', link: '/blog' },
];

export default function NavBar() {
  const [navbarOpen, setNavbarOpen] = useState(true);

  return (
    <header className={styles.navigationBar}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo}>
          GoLokal
        </Link>

        <nav>
          <ul className={styles.navLinks}>
            {links.map(({ id, title, link }) => (
              <Link href={link} key={`key-${id}`}>
                <li className={styles.navList}>{title}</li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.right}>
        <Link href="/login" className={styles.loginButton}>
          login
        </Link>
      </div>

      {/* MOBILE HAMBURGER NAV */}
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

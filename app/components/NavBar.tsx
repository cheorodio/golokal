'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BiSolidChevronDown } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { RxHamburgerMenu } from 'react-icons/rx';
import styles from '../styles/Navbar.module.scss';

// export const links = [
//   { id: 1, title: 'Home', link: '/' },
//   { id: 2, title: 'Shops', link: '/shops' },
//   { id: 3, title: 'About', link: '/about' },
//   { id: 4, title: 'Blog', link: '/blog' },
// ];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <div className={`${styles.nav} ${menuOpen ? styles[`navOpen`] : {}}`}>
        <ul className={styles.navLinks}>
          {/* {links.map(({ id, title, link }) => (
            <Link href={link} key={`key-${id}`}>
              <li>{title}</li>
            </Link>
          ))} */}
          <li className={styles.navList}>
            <Link href="/">Home</Link>
          </li>

          <li className={styles.discoverDropdown}>
            <div className={styles.discoverDropdownButton}>
              <p>Discover</p>
              <BiSolidChevronDown />
            </div>

            <div className={styles.discoverDropdownOptions}>
              <ul className={styles.discoverLink}>
                <li className={styles.discoverList}>
                  <Link href="/shops">Shops</Link>
                </li>
                <li className={styles.discoverList}>
                  <Link href="/products">Products</Link>
                </li>
              </ul>
            </div>
          </li>

          <li className={styles.navList}>
            <Link href="/about">About</Link>
          </li>
          <li className={styles.navList}>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
      </div>

      <button onClick={toggleMenu} className={styles.hamburgerIcon}>
        {!menuOpen ? <RxHamburgerMenu /> : <CgClose />}
      </button>
    </>
  );
}

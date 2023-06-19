'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { RxHamburgerMenu } from 'react-icons/rx';
import styles from '../styles/navFooter.module.scss';

const links = [
  { id: 1, title: 'Home', link: '/' },
  { id: 2, title: 'Discover', link: '/discover' },
  { id: 3, title: 'About', link: '/about' },
  { id: 4, title: 'Blog', link: '/blog' },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <div className={`${styles.nav} ${menuOpen ? styles[`navOpen`] : {}}`}>
        <ul className={styles.navLinks}>
          {links.map(({ id, title, link }) => (
            <Link href={link} key={`key-${id}`}>
              <li>{title}</li>
            </Link>
          ))}
        </ul>
      </div>

      <button onClick={toggleMenu} className={styles.hamburgerIcon}>
        {!menuOpen ? <RxHamburgerMenu /> : <CgClose />}
      </button>
    </>
  );
}

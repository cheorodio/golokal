'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { RxHamburgerMenu } from 'react-icons/rx';
import styles from '../styles/navFooter.module.scss';
import LoginModal from './LoginModal';

const links = [
  { id: 1, title: 'Home', link: '/' },
  { id: 2, title: 'Discover', link: '/discover' },
  { id: 3, title: 'Vendors', link: '/vendors' },
  { id: 4, title: 'About', link: '/about' },
];

export default function NavBar() {
  const [navbarOpen, setNavbarOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);

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
        <input className={styles.searchBar} placeholder="Search..." />
        {/* LOGIN BUTTON */}
        <button
          className={styles.loginButton}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          login
        </button>
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

      {/* LOGIN MODAL */}
      {openModal && <LoginModal closeModal={setOpenModal} />}
    </header>
  );
}

import Link from 'next/link';
import styles from '../styles/navFooter.module.scss';

const links = [
  { id: 1, title: 'Home', link: '/' },
  { id: 2, title: 'Shops', link: '/shops' },
  { id: 3, title: 'About', link: '/about' },
  { id: 4, title: 'Blog', link: '/blog' },
];

const shops = [
  { id: 1, title: 'Create a shop', link: '/shops/create-shop' },
  { id: 2, title: 'Policy', link: '/' },
];

const support = [
  { id: 1, title: 'Contact Us', link: '/shops/create-shop' },
  { id: 2, title: 'FAQ', link: '/' },
  { id: 3, title: 'Careers', link: '/' },
  { id: 4, title: 'About Us', link: '/' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          GoLokal
        </Link>
      </div>
      <div className={styles.linksContainer}>
        <div>
          <h3>Navigation</h3>
          <ul className={styles.footerLinks}>
            {links.map(({ id, title, link }) => (
              <Link href={link} key={`key-${id}`}>
                <li>{title}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className={styles.footerLinks}>
          <h3>For vendors</h3>
          <ul className={styles.footerLinks}>
            {shops.map(({ id, title, link }) => (
              <Link href={link} key={`key-${id}`}>
                <li>{title}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className={styles.footerLinks}>
          <h3>Company</h3>
          <ul className={styles.footerLinks}>
            {support.map(({ id, title, link }) => (
              <Link href={link} key={`key-${id}`}>
                <li>{title}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      {/* <div>
        <Link href="/about">About</Link>
        <Link href="/">FAQ</Link>
      </div> */}
    </footer>
  );
}

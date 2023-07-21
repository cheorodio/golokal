import { Domine } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import connect from '../public/images/icons/connect.png';
import discover from '../public/images/icons/discover.png';
import explore from '../public/images/icons/explore.png';
import keramiks from '../public/images/keramiks.jpg';
import about from '../public/images/vida.jpg';
import styles from './styles/homepage.module.scss';

const domine = Domine({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <section className={styles.heroSection}>
        <h1 className={domine.className}>
          Connecting Communities, Supporting Small Businesses
        </h1>
        {/* <p>Discover local vendors and hundreds of handmade products</p> */}
        <Link href="/shops" className={styles.heroLink}>
          explore now
        </Link>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.inBetween} />
        <div className={styles.aboutInfo}>
          <h2 className={`${styles.aboutTitle} ${domine.className}`}>
            The ultimate destination for local and handmade products.
          </h2>
          <p className={styles.aboutDescription}>
            At golokal, we are passionate about supporting artisans, craftsmen,
            and local businesses, and our platform serves as a virtual
            marketplace to showcase their unique creations.
          </p>
        </div>

        <div className={styles.imageSection}>
          <Image
            src={about}
            alt="A woman wearing a pair of handmade earrings"
            width={400}
            height={400}
            className={styles.aboutImage}
          />
        </div>

        <div className={styles.moreInfoSection}>
          <div className={styles.iconsSection}>
            <Image className={styles.icon} src={explore} alt="explore icon" />
            <p>Explore curated collection of local and handmade products.</p>
          </div>
          <div className={styles.iconsSection}>
            <Image className={styles.icon} src={discover} alt="discover icon" />

            <p>
              {' '}
              Discover the stories and talents of local artisans and craftsmen.
            </p>
          </div>
          <div className={styles.iconsSection}>
            <Image className={styles.icon} src={connect} alt="connect icon" />
            <p> Connect with a community of like-minded individuals.</p>
          </div>
        </div>
      </section>

      <section className={styles.discoverSection}>
        <div className={styles.imageSection}>
          <Image
            className={styles.vendorImage}
            height={400}
            width={400}
            src={keramiks}
            alt="vendor"
          />
        </div>

        <div className={styles.infoSection}>
          <h2 className={`${domine.className} ${styles.discoverTitle}`}>
            Discover local vendors with over 1000 handmade products
          </h2>
          <p className={styles.discoverInfo}>
            By supporting local and handmade products, you become an integral
            part of a movement that promotes community empowerment, fosters
            creativity, and fuels economic growth at a grassroots level.
          </p>
          <div className={styles.linkContainer}>
            <Link href="/shops" className={styles.exploreLink}>
              Explore now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import connect from '../public/images/icons/connect.png';
import discover from '../public/images/icons/discover.png';
import explore from '../public/images/icons/explore.png';
import about from '../public/images/vida.jpg';
import styles from './styles/homepage.module.scss';

export default function Home() {
  return (
    <main>
      <section className={styles.heroSection}>
        <h1>Connecting Communities, Supporting Small Businesses</h1>
        <p>Discover local vendors and hundreds of handmade products</p>
        <Link href="/shops" className={styles.heroLink}>
          explore now
        </Link>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.inBetween} />
        <div className={styles.aboutInfo}>
          <h2 className={styles.aboutTitle}>
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
      {/*
      <section className={styles.aboutSection}>
        <h2>Who are we?</h2>
        <p className={styles.introduction}>
          GoLokal is your ultimate destination for local and handmade products.
          We are passionate about supporting artisans, craftsmen, and local
          businesses, and our platform serves as a virtual marketplace to
          showcase their unique creations.
        </p>
        <div className={styles.highlights}>
          <div>
            <h6>01</h6>
            <h4>Explore</h4>
            <Image
              className={styles.iconHidden}
              src={explore}
              alt="explore icon"
            />
            <p>
              Explore a thoughtfully curated collection of local and handmade
              products, handpicked for their exceptional quality, uniqueness,
              and craftsmanship.
            </p>
          </div>
          <div>
            <h6>02</h6>
            <h4>Discover</h4>
            <Image
              className={styles.iconHidden}
              src={discover}
              alt="discover icon"
            />
            <p>
              Connect with a vibrant community of like-minded individuals who
              share your love for locally made goods. Engage in discussions,
              attend events, and collaborate with fellow enthusiasts and
              artisans.
            </p>
          </div>
          <div>
            <h6>03</h6>
            <h4>Connect</h4>
            <Image
              className={styles.iconHidden}
              src={connect}
              alt="connect icon"
            />
            <p>
              Connect with a vibrant community of like-minded individuals who
              share your love for locally made goods. Engage in discussions,
              attend events, and collaborate with fellow enthusiasts and
              artisans.
            </p>
          </div>
        </div>
      </section> */}

      {/* <section className={styles.discoverSection}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.discoverImage}
            src={discoverHeader}
            alt="Image of a girl wearing handmade polymer clay earrings"
          />
        </div>
        <div className={styles.textContainer}>
          <h2>Discover local vendors with over 1000 handmade products</h2>
          <p>
            By supporting local and handmade products, you become an integral
            part of a movement that promotes community empowerment, fosters
            creativity, and fuels economic growth at a grassroots level.
          </p>
          <Link href="/" className={styles.discoverButton}>
            explore now
          </Link>
        </div>
      </section> */}
      {/*
      <section className={styles.statistics}>
        <Image
          className={styles.potteryImage}
          src={statistic}
          alt="image of a hand making pottery"
        />
        <div className={styles.information}>
          <div>
            <h3>1000</h3>
            <p>handmade products</p>
          </div>
          <div>
            <h3>20</h3>
            <p>categories to choose from</p>
          </div>
          <div>
            <h3>15</h3>
            <p>registered vendors</p>
          </div>
          <div>
            <h3>300</h3>
            <p>registered users</p>
          </div>
        </div>
      </section> */}
    </main>
  );
}

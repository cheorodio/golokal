import Image from 'next/image';
import Link from 'next/link';
// import discoverHeader from '../public/images/discoverHeader.jpg';
import connect from '../public/images/icons/connect.png';
import discover from '../public/images/icons/discover.png';
import explore from '../public/images/icons/explore.png';
import statistic from '../public/images/statistic.jpg';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main>
      <section className={styles.heroSection}>
        <h1>Embrace the artistry of your community </h1>
        <p>and support your local vendors and small businesses</p>
        <Link href="/" className={styles.heroLink}>
          eplore now
        </Link>
      </section>

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
              Discover the stories and talents of local artisans and craftsmen
              who pour their passion into creating each handmade item,
              empowering them to thrive and preserve their traditional skills.
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
      </section>

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
      </section>
    </main>
  );
}

import Link from 'next/link';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <h1>Embrace the artistry of your community </h1>
        <p>and support your local vendors and small businesses</p>
        <Link href="/" className={styles.heroLink}>
          eplore now
        </Link>
      </section>
    </main>
  );
}

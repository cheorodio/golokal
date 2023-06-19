import Link from 'next/link';
import styles from '../styles/loginPage.module.scss';

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <Link href="/user-login">Login as a user</Link>
      <Link href="/vendor-login">Login as a vendor</Link>
    </div>
  );
}

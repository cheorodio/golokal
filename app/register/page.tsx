import Link from 'next/link';
import styles from '../styles/loginPage.module.scss';

export default function RegisterPage() {
  return (
    <div className={styles.registerPage}>
      <Link href="/user-register">Register as user</Link>
      <Link href="/vendor-register">Register as vendor</Link>
    </div>
  );
}

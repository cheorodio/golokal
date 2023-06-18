import Link from 'next/link';
import styles from '../../styles/loginPage.module.scss';

export default function RegisterPage() {
  return (
    <div className={styles.registerOption}>
      <Link href="/register/user-register">Register as a user</Link>
      <Link href="/register/vendor-register">Register as a vendor</Link>
    </div>
  );
}

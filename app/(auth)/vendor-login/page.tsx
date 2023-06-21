import Link from 'next/link';
import styles from '../../styles/loginPage.module.scss';

export default function VendorRegistrationPage() {
  return (
    <div className={styles.vendorLoginOptionPage}>
      <Link href="/vendor-login/login">Login here</Link>
      <Link href="/vendor-login/register">Register here</Link>
    </div>
  );
}

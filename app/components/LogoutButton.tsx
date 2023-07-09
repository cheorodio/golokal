'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { HiOutlineLogout } from 'react-icons/hi';
import styles from '../styles/Navbar.module.scss';

type Props = {
  logout: () => void;
};

export function LogoutButton(props: Props) {
  const router = useRouter();
  return (
    <form className={styles.logoutLink}>
      <button
        formAction={async () => {
          await props.logout();
          router.push('/' as Route);
          router.refresh();
        }}
        className={styles.logoutButton}
      >
        <span className={styles.logoutMobile}>Logout</span>
        <span className={styles.logoutDesktop}>
          <HiOutlineLogout />
        </span>
      </button>
    </form>
  );
}

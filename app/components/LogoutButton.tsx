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
    <form>
      <button
        formAction={async () => {
          await props.logout();
          router.push('/' as Route);
          router.refresh();
        }}
        className={styles.logoutButton}
      >
        <div className={styles.logoutButtons}>
          <p className={styles.logoutMobile}>Logout</p>
          <HiOutlineLogout className={styles.logoutDesktop} />
        </div>
      </button>
    </form>
  );
}

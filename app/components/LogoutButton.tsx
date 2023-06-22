'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';
import styles from '../styles/navFooter.module.scss';

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
        Logout
      </button>
    </form>
  );
}

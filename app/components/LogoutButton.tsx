'use client';

import { useRouter } from 'next/navigation';
import styles from './navFooter.module.scss';

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
          router.refresh();
        }}
        className={styles.logoutButton}
      >
        logout
      </button>
    </form>
  );
}

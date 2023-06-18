'use client';

import { useRouter } from 'next/navigation';
import { logout } from '../(auth)/logout/actions';
import styles from './navFooter.module.scss';

export default function LogoutButton() {
  const router = useRouter();
  return (
    <form>
      <button
        formAction={async () => {
          await logout();
          router.refresh();
        }}
      >
        logout
      </button>
    </form>
  );
}

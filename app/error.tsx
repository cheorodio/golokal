'use client';
import styles from './styles/pages.module.scss';

export default function RootError() {
  return (
    <div className={styles.errorMessage}> ❌ Oops! Something went wrong ❌</div>
  );
}

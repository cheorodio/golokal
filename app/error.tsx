'use client';
import styles from './styles/rootPages.module.scss';

export default function RootError() {
  return (
    <div className={styles.errorMessage}> ❌ Oops! Something went wrong ❌</div>
  );
}

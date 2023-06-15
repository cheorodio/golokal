import styles from './login.module.scss';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <main className={styles.loginPage}>
      <LoginForm />
      <div className={styles.overlay} />
    </main>
  );
}

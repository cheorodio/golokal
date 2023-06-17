import LoginForm from './Login';
import styles from './login.module.scss';

export default function LoginPage() {
  return (
    <main className={styles.loginPage}>
      <LoginForm />
    </main>
  );
}

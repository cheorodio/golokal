import RegisterForm from './Register';
import styles from './register.module.scss';

export default function RegisterPage() {
  return (
    <main className={styles.loginPage}>
      <RegisterForm />
    </main>
  );
}

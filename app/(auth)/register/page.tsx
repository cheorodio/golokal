import styles from './register.module.scss';
import RegisterForm from './RegisterForm';

export default function RegisterPage() {
  return (
    <main className={styles.registerPage}>
      <RegisterForm />
      <div className={styles.overlay} />
    </main>
  );
}

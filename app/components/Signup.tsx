import { useState } from 'react';
import styles from '../styles/login.module.scss';

export default function Signup(props: {
  onformSwitch: (arg0: string) => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  return (
    <div className={styles.signupContainer}>
      <div className={styles.toggleButtons}>
        <div className={styles.signUpToggleButton}>Sign up</div>
        <button
          onClick={() => props.onformSwitch('login')}
          className={`${styles.toggleButton} ${styles.loginButton}`}
        >
          Log in
        </button>
        <button className={`${styles.toggleButton} ${styles.toggleSignup}`}>
          Sign up
        </button>
      </div>

      <form
        onSubmit={(event) => event.preventDefault()}
        id="signup"
        className={styles.loginForm}
      >
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className={styles.signupInput}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          value={password}
          id="password"
          onChange={(event) => setPassword(event.currentTarget.value)}
          className={styles.signupInput}
          required
        />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          value={confirmPass}
          id="confirm-password"
          onChange={(event) => setConfirmPass(event.currentTarget.value)}
          className={styles.signupInput}
          required
        />
        <button className={styles.loginSubmit}>Sign Up</button>
      </form>
    </div>
  );
}

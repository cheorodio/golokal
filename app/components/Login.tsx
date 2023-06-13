'use client';
import { useState } from 'react';
import styles from '../styles/login.module.scss';

export default function Login(props: { onformSwitch: (arg0: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.toggleButtons}>
        <div className={styles.logInToggleButton}>Log in</div>
        <button className={`${styles.toggleButton} ${styles.loginButton}`}>
          Log in
        </button>
        <button
          onClick={() => props.onformSwitch('signup')}
          className={`${styles.toggleButton} ${styles.toggleSignup}`}
        >
          Sign up
        </button>
      </div>

      <form
        onSubmit={(event) => event.preventDefault()}
        id="login"
        className={styles.loginForm}
      >
        <label htmlFor="email">
          Email Address <span>*</span>
        </label>
        <input
          id="email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          className={styles.loginInput}
          required
        />
        <label htmlFor="password">
          Password <span>*</span>
        </label>
        <div>
          <input
            id="password"
            type={passwordShown ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={styles.passwordInput}
            required
          />
          <button
            onClick={togglePassword}
            className={styles.showPasswordButton}
          >
            show
          </button>
        </div>

        <button className={`${styles.loginSubmit} ${styles.signupSubmit}`}>
          Log in
        </button>
      </form>
    </div>
  );
}

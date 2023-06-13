'use client';
import { useState } from 'react';
import styles from '../styles/Login.module.scss';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          className={styles.loginInput}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={styles.loginInput}
          required
        />

        <button className={`${styles.loginSubmit} ${styles.signupSubmit}`}>
          Log in
        </button>
      </form>
    </div>
  );
}

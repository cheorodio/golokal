'use client';
import Image from 'next/image';
import { useState } from 'react';
import loginImage from '../../public/images/hero.jpg';
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
      <div className={styles.imageSide}>
        <Image
          src={loginImage}
          alt="Image of handmade pottery"
          className={styles.loginImage}
        />
      </div>

      <div className={styles.loginFormSide}>
        <h1>Welcome back</h1>
        <p>
          login to your account to connect with your favourite local vendors
        </p>

        <form
          onSubmit={(event) => event.preventDefault()}
          id="login"
          className={styles.loginForm}
        >
          <label htmlFor="email">
            Username <span>*</span>
          </label>
          <input
            id="email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            className={styles.loginInput}
            required
          />

          <label htmlFor="password" className={styles.passwordLabel}>
            Password <span>*</span>
          </label>
          <div>
            <input
              id="password"
              type={passwordShown ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
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

          <button className={styles.loginSubmit}>Log in</button>
        </form>

        <div className={styles.signupContainer}>
          <p>
            Don't have an account yet?
            <button
              className={styles.registerButton}
              onClick={() => props.onformSwitch('signup')}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

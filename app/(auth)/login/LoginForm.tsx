'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import loginImage from '../../../public/images/hero.jpg';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';
import styles from './login.module.scss';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState<string>();

  async function login() {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      console.log(data.error);
      return;
    }
  }

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
        <Link href="/" className={styles.closeModalButton}>
          <IoClose />
        </Link>

        <form
          onSubmit={(event) => event.preventDefault()}
          id="login"
          className={styles.loginForm}
        >
          <label htmlFor="username">
            Username <span>*</span>
          </label>
          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
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

          <button
            className={styles.loginSubmit}
            onClick={async () => await login()}
          >
            Log in
          </button>
          {error !== '' && <div className={styles.error}>{error}</div>}
        </form>

        <div className={styles.signupContainer}>
          <p>
            Don't have an account yet?
            <Link href="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

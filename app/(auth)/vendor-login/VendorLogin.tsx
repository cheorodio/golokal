'use client';

import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';
import loginImage from '../../../public/images/login.jpg';
import { LoginResponseBodyPost } from '../../api/(auth)/vendorLogin/route';
import styles from '../../styles/loginPage.module.scss';
import { getSafeReturnToPath } from '../../util/validation';

type Props = { returnTo?: string };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [shopname, setShopname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter();

  async function login() {
    const response = await fetch('/api/vendorLogin', {
      method: 'POST',
      body: JSON.stringify({
        username,
        shopname,
        password,
      }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      console.log(data.error);
      return;
    }
    router.push(
      getSafeReturnToPath(props.returnTo) ||
        (`/shop/${data.vendor.username}` as Route),
    );
    router.refresh();
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginFormSide}>
        <div className={styles.form}>
          <div className={styles.greeting}>
            <h1>Welcome back</h1>
            <p>
              Login to your account to connect with your favourite local vendors
            </p>
          </div>

          <form
            onSubmit={(event) => event.preventDefault()}
            id="login"
            className={styles.loginForm}
          >
            <div>
              <label htmlFor="username">
                Username <span>*</span>
              </label>
              <input
                id="username"
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </div>

            <div>
              <label htmlFor="shopname">
                Shop name <span>*</span>
              </label>
              <input
                id="shopname"
                value={shopname}
                onChange={(event) => setShopname(event.currentTarget.value)}
              />
            </div>

            <div>
              <label htmlFor="password">
                Password <span>*</span>
              </label>

              <div>
                <input
                  id="password"
                  type={passwordShown ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />
                <button
                  onClick={togglePassword}
                  className={styles.showPasswordButton}
                >
                  {passwordShown ? <RxEyeClosed /> : <RxEyeOpen />}
                </button>
              </div>
            </div>
            <button
              className={styles.loginSubmit}
              onClick={async () => await login()}
            >
              Log in
            </button>
            {error !== '' && <div className={styles.error}>{error}</div>}
          </form>
        </div>

        <div className={styles.signupContainer}>
          <p>
            Don't have an account yet?
            <Link href="/register" className={styles.registerLink}>
              Register here
            </Link>
          </p>
        </div>
      </div>

      <div className={styles.imageSide}>
        <Image
          src={loginImage}
          alt="Image of handmade pottery"
          className={styles.loginImage}
        />
      </div>
    </div>
  );
}

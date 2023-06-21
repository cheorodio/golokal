'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';
import loginImage from '../../../../public/images/login.jpg';
import { VendorRegisterResponseBodyPost } from '../../../api/(auth)/vendorRegister/route';
import styles from '../../../styles/loginPage.module.scss';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [shopname, setShopname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  async function register() {
    const response = await fetch('/api/vendorRegister', {
      method: 'POST',
      body: JSON.stringify({
        username,
        shopname,
        email,
        password,
      }),
    });

    const data: VendorRegisterResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      return;
    }
    console.log(data.vendor);
    router.push(`/admin/${data.vendor.username}`);
    router.refresh();
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginFormSide}>
        <div className={styles.form}>
          <div className={styles.greeting}>
            <Link href="/register" className={styles.returnLink}>
              {' '}
              <HiOutlineArrowNarrowLeft />
              Go back
            </Link>
            <h1>Welcome</h1>
            <p>
              GoLokal is a platform connecting you with local vendors. Create an
              account to get started.
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
              <label htmlFor="email">
                Email <span>*</span>
              </label>
              <input
                id="email"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
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
              onClick={async () => await register()}
            >
              Register
            </button>
            {error !== '' && <div className={styles.error}>{error}</div>}
          </form>
        </div>

        <div className={styles.signupContainer}>
          <p>
            Already have an account?
            <Link href="/login" className={styles.registerLink}>
              Login here
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

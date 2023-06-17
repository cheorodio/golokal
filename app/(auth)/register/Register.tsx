'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import loginImage from '../../../public/images/login.jpg';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import styles from '../../styles/loginPage.module.scss';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  async function register() {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
    }

    if ('user' in data) {
      router.push(`/profile/${data.user.username}`);
      router.refresh();
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginFormSide}>
        <div className={styles.form}>
          <div className={styles.greeting}>
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
                  show
                </button>
              </div>
            </div>
            <button
              className={styles.loginSubmit}
              onClick={async () => await register()}
            >
              Log in
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

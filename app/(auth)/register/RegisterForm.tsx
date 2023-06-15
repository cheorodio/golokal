'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import loginImage from '../../../public/images/hero.jpg';
import styles from './register.module.scss';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.imageSide}>
        <Image
          src={loginImage}
          alt="Image of handmade pottery"
          className={styles.loginImage}
        />
      </div>

      <div className={styles.registerFormSide}>
        <h1>Welcome!</h1>
        <p>
          GoLokal is a platform connecting you with local vendors and small
          businesses. Create an account to get started.
        </p>
        <Link href="/" className={styles.closeModalButton}>
          <IoClose />
        </Link>

        <form
          onSubmit={(event) => event.preventDefault()}
          id="login"
          className={styles.registerForm}
        >
          <div>
            <label htmlFor="username">
              Username <span>*</span>
            </label>
            <input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
              required
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
              required
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
                required
              />
              <button
                onClick={togglePassword}
                className={styles.showPasswordButton}
              >
                show
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassd">
              Confirm Password <span>*</span>
            </label>
            <div>
              <input
                id="confirmPass"
                type={confirmPasswordShown ? 'text' : 'password'}
                value={confirmPass}
                onChange={(event) => setConfirmPass(event.currentTarget.value)}
                required
              />
              <button
                onClick={toggleConfirmPassword}
                className={styles.showPasswordButton}
              >
                show
              </button>
            </div>
          </div>
          <button className={styles.registerSubmit} onClick={() => {}}>
            Register
          </button>
        </form>

        <div className={styles.loginContainer}>
          <p>
            Already have an account?
            <Link href="/login" className={styles.loginButton}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

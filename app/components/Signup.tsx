import { useState } from 'react';
import styles from '../styles/login.module.scss';

export default function Signup(props: {
  onformSwitch: (arg0: string) => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

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
        <label htmlFor="email">
          Email Address <span>*</span>
        </label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className={styles.signupInput}
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
        <label htmlFor="confirm-password">
          Confirm Password <span>*</span>
        </label>
        <div>
          <input
            value={confirmPass}
            id="confirm-password"
            onChange={(event) => setConfirmPass(event.currentTarget.value)}
            className={styles.signupInput}
            required
          />
          <button
            onClick={togglePassword}
            className={styles.showPasswordButton}
          >
            show
          </button>
        </div>
        <button className={styles.loginSubmit}>Sign Up</button>
      </form>
    </div>
  );
}

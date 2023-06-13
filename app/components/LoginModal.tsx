import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import styles from '../styles/Login.module.scss';
import Login from './Login';
import Signup from './Signup';

export default function LoginModal({ closeModal }) {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <>
      <button
        onClick={() => closeModal(false)}
        className={styles.closeModalButton}
      >
        <IoClose />
      </button>
      {currentForm === 'login' ? (
        <Login onformSwitch={toggleForm} />
      ) : (
        <Signup onformSwitch={toggleForm} />
      )}
      <div className={styles.overlay} />
    </>
  );
}

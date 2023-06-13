import { SetStateAction, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import styles from '../styles/login.module.scss';
import Login from './Login';
import Signup from './Signup';

export default function LoginModal({ closeModal }) {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName: SetStateAction<string>) => {
    setCurrentForm(formName);
  };
  return (
    <>
      <button onClick={() => closeModal()} className={styles.closeModalButton}>
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

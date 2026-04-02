import React, {useState} from 'react';

import Button from '@components/button/basic/Button';
import BaseModalWindow from '@components/modal/base/Base';

import styles from './login.module.scss';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

const LoginModal = ({isOpen, onClose, onLogin}: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email.trim(), password.trim());
    setEmail('');
    setPassword('');
    onClose();
  };

  return (
    <BaseModalWindow isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>Войти</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <Button type="submit" className={styles.submitButton}>
          Войти
        </Button>
      </form>
    </BaseModalWindow>
  );
};

export default LoginModal;

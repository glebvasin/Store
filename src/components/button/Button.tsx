import React from 'react';

import styles from './button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  title: string;
}

const Button = ({title, onClick}: ButtonProps) => {
  return (
    <div className={styles.button} onClick={onClick}>
      <button>{title}</button>
    </div>
  );
};

export default Button;

import React from 'react';

import Button from '@components/buttons/basicButton/Button';

import styles from './backButton.module.scss';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton = ({onClick}: BackButtonProps) => {
  return (
    <Button className={styles.backButton} onClick={onClick}>
      ← Назад
    </Button>
  );
};

export default BackButton;

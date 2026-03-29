import React from 'react';

import Button from '@components/buttons/basicButton/Button';

import styles from './card.module.scss';

interface CardProps {
  title: string;
  description: string;
  category: string;
}

const Card = ({title, description, category}: CardProps) => {
  return (
    <div className={styles.card}>
      <img className={styles.cardImage} src="!#" alt={title} />
      <h1 className={styles.cardTitle}>{title}</h1>
      <p className={styles.cardDescription}>{description}</p>
      <p className={styles.cardCategory}>Категория: {category}</p>
      <div className={styles.cardButton}>
        <Button>В корзину</Button>
      </div>
    </div>
  );
};

export default Card;

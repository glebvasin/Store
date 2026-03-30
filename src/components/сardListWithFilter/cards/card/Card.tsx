import React from 'react';

import Button from '@components/buttons/basicButton/Button';
import FavoriteButton from '@components/buttons/favoriteButton/FavoriteButton';

import styles from './card.module.scss';

interface CardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const Card = ({id, title, description, category, isFavorite, onToggleFavorite}: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <FavoriteButton isFavorite={isFavorite} onClick={() => onToggleFavorite(id)} />
      </div>
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

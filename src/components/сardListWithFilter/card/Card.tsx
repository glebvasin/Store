import {useNavigate} from 'react-router-dom';

import React from 'react';

import Button from '@components/button/basic/Button';
import FavoriteButton from '@components/button/favorite/FavoriteButton';

import styles from './card.module.scss';

interface CardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  images: string[];
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const Card = ({
  id,
  title,
  description,
  category,
  images,
  isFavorite,
  onToggleFavorite,
}: CardProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card} onClick={() => navigate(`/card/${id}`)}>
      <div className={styles.cardHeader}>
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={e => {
            e.stopPropagation();
            onToggleFavorite(id);
          }}
        />
      </div>
      <img className={styles.cardImage} src={images[0]} alt={title} />
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

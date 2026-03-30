import React from 'react';

import styles from './favoriteButton.module.scss';

interface FavoriteButtonProps {
  isFavorite?: boolean;
  onClick?: () => void;
  isHeaderButton?: boolean;
}

const FavoriteButton = ({
  isFavorite = false,
  onClick,
  isHeaderButton = false,
}: FavoriteButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <svg
        viewBox="0 0 24 24"
        className={`${styles.icon} ${isFavorite && !isHeaderButton ? styles.active : ''}`}>
        <path d="M19.6706 5.4736C17.6806 3.8336 14.7206 4.1236 12.8906 5.9536L12.0006 6.8436L11.1106 5.9536C9.29063 4.1336 6.32064 3.8336 4.33064 5.4736C2.05064 7.3536 1.93063 10.7436 3.97063 12.7836L11.6406 20.4536C11.8406 20.6536 12.1506 20.6536 12.3506 20.4536L20.0206 12.7836C22.0706 10.7436 21.9506 7.3636 19.6706 5.4736Z" />
      </svg>
    </button>
  );
};

export default FavoriteButton;

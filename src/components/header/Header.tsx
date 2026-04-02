import React, {useState} from 'react';

import Button from '@components/button/basic/Button';
import FavoriteButton from '@components/button/favorite/FavoriteButton';
import Search from '@components/header/search/Search';
import BaseModalWindow from '@components/modal/base/Base';
import LoginModal from '@components/modal/login/Login';
import Card from '@components/сardListWithFilter/card/Card';

import styles from './header.module.scss';
interface CardType {
  id: number;
  title: string;
  description: string;
  category: string;
  images: string[];
  isFavorite: boolean;
}

interface HeaderProps {
  searchTitle: string;
  setSearchTitle: (searchTitle: string) => void;
  favorites: CardType[];
  cards: CardType[];
  toggleFavorite: (id: number) => void;
}

const Header = ({setSearchTitle, searchTitle, favorites, toggleFavorite}: HeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className={styles.header}>
      <img src="!#" alt="Логотип" />

      <Search searchTitle={searchTitle} onSearch={setSearchTitle} />

      <div className={styles.actions}>
        <FavoriteButton isHeaderButton={true} onClick={() => setIsModalOpen(true)} />

        <Button type="button" className={styles.actionButton}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z"
              fill="currentColor"
            />
            <path
              d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z"
              fill="currentColor"
            />
            <path
              d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
              fill="currentColor"
            />
          </svg>
        </Button>

        <Button
          type="button"
          className={styles.actionButton}
          onClick={() => {
            setIsLoginOpen(true);
          }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 5H8V9H6V3H22V21H6V15H8V19H20V5Z" fill="currentColor" />
            <path
              d="M13.0743 16.9498L11.6601 15.5356L14.1957 13H2V11H14.1956L11.6601 8.46451L13.0743 7.05029L18.024 12L13.0743 16.9498Z"
              fill="currentColor"
            />
          </svg>
        </Button>
      </div>

      <BaseModalWindow isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Избранные</h2>
        <div className={styles.favoriteGrid}>
          {favorites.length === 0 ? (
            <p>хули зашел, выбери в начале</p>
          ) : (
            favorites.map(card => (
              <div key={card.id}>
                <Card
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  description={card.description}
                  category={card.category}
                  images={card.images}
                  isFavorite={card.isFavorite}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            ))
          )}
        </div>
      </BaseModalWindow>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={(email, password) => console.log('Логин:', email, password)}
      />
    </div>
  );
};

export default Header;

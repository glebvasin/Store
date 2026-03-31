import React, {useState} from 'react';

import BaseModalWindow from '@components/baseModalWindow/BaseModalWindow';
import Button from '@components/button/basic/Button';
import FavoriteButton from '@components/button/favorite/FavoriteButton';
import Search from '@components/header/search/Search';
import Card from '@components/сardListWithFilter/card/Card';

import styles from './header.module.scss';
interface CardType {
  id: number;
  title: string;
  description: string;
  category: string;
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

  return (
    <div className={styles.header}>
      <img src="!#" alt="Логотип" />

      <Search searchTitle={searchTitle} onSearch={setSearchTitle} />

      <FavoriteButton isHeaderButton={true} onClick={() => setIsModalOpen(true)} />

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
                  isFavorite={card.isFavorite}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            ))
          )}
        </div>
      </BaseModalWindow>

      <Button>Корзина</Button>
    </div>
  );
};

export default Header;

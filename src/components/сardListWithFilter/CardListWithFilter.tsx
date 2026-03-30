import React from 'react';

import BackButton from '@components/buttons/backButton/BackButton';

import CategoryDropdown from '../dropdown/CategoryDropdown';

import styles from './cardListWithFilter.module.scss';
import Card from './cards/card/Card';

interface CardType {
  id: number;
  title: string;
  description: string;
  category: string;
  isFavorite: boolean;
}
interface CardListWithFilterProps {
  searchTitle: string;
  setSearchTitle: (title: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  cards: CardType[];
  toggleFavorite: (id: number) => void;
}

const CardListWithFilter = ({
  searchTitle,
  setSearchTitle,
  selectedCategory,
  setSelectedCategory,
  cards,
  toggleFavorite,
}: CardListWithFilterProps) => {
  // собираем уникальные категории из массива карточек
  const categories = Array.from(new Set(cards.map((card: CardType) => card.category)));

  const normalizedSearch = searchTitle.trim().toLowerCase();

  const filteredCards = cards.filter((card: CardType) => {
    const matchCategory = selectedCategory ? card.category === selectedCategory : true;
    const matchTitle = normalizedSearch
      ? card.title.toLowerCase().includes(normalizedSearch)
      : true;
    return matchCategory && matchTitle;
  });
  return (
    <div>
      {/* Кнопка НАЗАД  для ПОИСКА || КАТЕГОРИИ */}
      <div className={styles.backButtonWrapper}>
        {(searchTitle.trim() || selectedCategory) && (
          <BackButton
            onClick={() => {
              setSearchTitle('');
              setSelectedCategory('');
            }}
          />
        )}
      </div>

      <CategoryDropdown
        categories={categories}
        selected={selectedCategory}
        onChange={setSelectedCategory}
      />

      <div className={styles.grid}>
        {filteredCards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            category={card.category}
            isFavorite={card.isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default CardListWithFilter;

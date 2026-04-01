import React from 'react';

import Button from '@components/button/basic/Button';

import MainSelectDropdown from '../dropdown/mainSelectDropdown/MainSelectDropdown';

import Card from './card/Card';
import styles from './cardListWithFilter.module.scss';

interface CardType {
  id: number;
  title: string;
  description: string;
  category: string;
  images: string[];
  isFavorite: boolean;
}

interface CardListWithFilterProps {
  searchTitle: string;
  setSearchTitle: (title: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  cards: CardType[];
  toggleFavorite: (id: number) => void;
  numberCard: number | '';
  setNumberCard: (value: number) => void;
}

const CardListWithFilter: React.FC<CardListWithFilterProps> = ({
  searchTitle,
  setSearchTitle,
  selectedCategory,
  setSelectedCategory,
  cards,
  toggleFavorite,
  numberCard,
  setNumberCard,
}) => {
  const categories = Array.from(new Set(cards.map(card => card.category)));
  const normalizedSearch = searchTitle.trim().toLowerCase();

  const filteredCards = cards.filter(card => {
    const matchCategory = selectedCategory ? card.category === selectedCategory : true;
    const matchTitle = normalizedSearch
      ? card.title.toLowerCase().includes(normalizedSearch)
      : true;
    return matchCategory && matchTitle;
  });

  return (
    <div>
      {/* Кнопка НАЗАД */}
      <div className={styles.backButtonWrapper}>
        {(searchTitle.trim() || selectedCategory) && (
          <Button
            className={styles.backButton}
            onClick={() => {
              setSearchTitle('');
              setSelectedCategory('');
            }}>
            НАЗАД
          </Button>
        )}
      </div>

      {/* Фильтры */}
      <div className={styles.controlsRow}>
        <MainSelectDropdown
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Все категории"
          options={categories.map(cat => ({value: cat, label: cat}))}
        />

        <MainSelectDropdown
          value={numberCard}
          onChange={setNumberCard}
          placeholder="Количество карточек"
          options={[3, 5, 10, 15].map(n => ({value: n, label: String(n)}))}
        />
      </div>

      {/* Список карточек */}
      <div className={styles.grid}>
        {filteredCards.map(card => (
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
        ))}
      </div>
    </div>
  );
};

export default CardListWithFilter;

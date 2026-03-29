import React, {useState} from 'react';

import BackButton from '@components/buttons/backButton/BackButton';

import CategoryDropdown from '../dropdown/CategoryDropdown';

import styles from './cardListWithFilter.module.scss';
import Card from './cards/card/Card';
import {cards} from './cards/helper';

interface CardListWithFilterProps {
  searchTitle: string;
  setSearchTitle: (title: string) => void;
}

const CardListWithFilter = ({searchTitle, setSearchTitle}: CardListWithFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  // собираем уникальные категории из массива карточек
  const categories = Array.from(new Set(cards.map(card => card.category)));

  const filteredCards = cards.filter(card => {
    const matchCategory = selectedCategory ? card.category === selectedCategory : true;
    const matchTitle = searchTitle
      ? card.title.toLowerCase().includes(searchTitle.toLowerCase())
      : true;
    return matchCategory && matchTitle;
  });
  return (
    <div>
      {/* Кнопка НАЗАД  для ПОИСКА || КАТЕГОРИИ */}
      <div className={styles.backButtonWrapper}>
        {(searchTitle || selectedCategory) && (
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
            title={card.title}
            description={card.description}
            category={card.category}
          />
        ))}
      </div>
    </div>
  );
};

export default CardListWithFilter;

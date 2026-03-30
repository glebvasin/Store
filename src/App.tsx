import React, {useState} from 'react';

import Header from '@components/header/Header';
import CardListWithFilter from '@components/сardListWithFilter/CardListWithFilter';
import {cards as initialCards} from '@components/сardListWithFilter/cards/helper';

import styles from './app.module.scss';

interface CardType {
  id: number;
  title: string;
  description: string;
  category: string;
  isFavorite: boolean;
}

const App = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [cards, setCards] = useState<CardType[]>(
    initialCards.map(card => ({...card, isFavorite: false})),
  );

  const toggleFavorite = (id: number) => {
    setCards(prev =>
      prev.map(card => (card.id === id ? {...card, isFavorite: !card.isFavorite} : card)),
    );
  };

  const favorites = cards.filter(card => card.isFavorite);

  return (
    <div className={styles.app}>
      <Header
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        cards={cards}
      />

      <CardListWithFilter
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cards={cards}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default App;

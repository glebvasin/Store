import React, {useCallback, useMemo, useState} from 'react';

import Header from '@components/header/Header';
import CardListWithFilter from '@components/сardListWithFilter/CardListWithFilter';
import {cards as initialCards} from '@components/сardListWithFilter/cards/helper';

import styles from './home.module.scss';
interface CardType {
  id: number;
  title: string;
  description: string;
  category: string;
  isFavorite: boolean;
}
// interface HomeProps {}

const HomePage = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [cards, setCards] = useState<CardType[]>(
    initialCards.map(card => ({...card, isFavorite: false})),
  );

  const toggleFavorite = useCallback((id: number) => {
    setCards(prev =>
      prev.map(card => (card.id === id ? {...card, isFavorite: !card.isFavorite} : card)),
    );
  }, []);

  const favorites = useMemo(() => cards.filter(card => card.isFavorite), [cards]);

  return (
    <div className={styles.home}>
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

export default HomePage;

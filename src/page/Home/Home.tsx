import {TProductWithFavorite, TProduct} from 'api/products/types';
import {useState, useCallback, useMemo, useEffect} from 'react';
import React from 'react';

import Button from '@components/button/basic/Button';
import Header from '@components/header/Header';
import CardListWithFilter from '@components/сardListWithFilter/CardListWithFilter';

const DEFAULT_PAGE_SIZE = 5;

const HomePage = () => {
  const [cards, setCards] = useState<TProductWithFavorite[]>([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);

  const [searchTitle, setSearchTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const toggleFavorite = useCallback((id: number) => {
    setCards(prev =>
      prev.map(card => (card.id === id ? {...card, isFavorite: !card.isFavorite} : card)),
    );
  }, []);

  const favorites = useMemo(() => cards.filter(card => card.isFavorite), [cards]);

  const loadCards = useCallback(() => {
    fetch(`https://dummyjson.com/products?limit=${DEFAULT_PAGE_SIZE}&skip=${skip}`)
      .then(res => res.json())
      .then(data => {
        const newCards = data.products.map((card: TProduct) => ({
          ...card,
          isFavorite: false,
        }));

        setCards(prev => [...prev, ...newCards]);
        setSkip(prev => prev + DEFAULT_PAGE_SIZE);
        setTotal(data.total);
      });
  }, [skip]);

  // первый рендер
  useEffect(() => {
    loadCards();
  }, []);

  return (
    <div>
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
        numberCard={numberCard}
        setNumberCard={setNumberCard}
      />

      {cards.length < total && <Button onClick={loadCards}>Ещё</Button>}
    </div>
  );
};

export default HomePage;

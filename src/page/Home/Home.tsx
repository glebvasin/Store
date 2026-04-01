import React, {useState, useEffect, useCallback, useMemo} from 'react';

import Button from '@components/button/basic/Button';
import Header from '@components/header/Header';
import CardListWithFilter from '@components/сardListWithFilter/CardListWithFilter';

import {TProduct, TProductWithFavorite} from '../../api/products/types';

const DEFAULT_PAGE_SIZE = 5;

const HomePage = () => {
  // текущие загруженные карточки
  const [cards, setCards] = useState<TProductWithFavorite[]>([]);
  // сколько карточек уже загружено с сервера
  const [skip, setSkip] = useState(0);
  // всего карточек на сервере
  const [total, setTotal] = useState(0);

  const [searchTitle, setSearchTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // выбранное количество для добавления карточек через кнопку Ещё
  const [numberCard, setNumberCard] = useState<number | ''>('');

  const toggleFavorite = useCallback((id: number) => {
    setCards(prev =>
      prev.map(card => (card.id === id ? {...card, isFavorite: !card.isFavorite} : card)),
    );
  }, []);

  const favorites = useMemo(() => cards.filter(card => card.isFavorite), [cards]);

  const loadCards = useCallback(
    (count?: number) => {
      const limit = count ?? DEFAULT_PAGE_SIZE; // если ничего не выбрано — 5
      fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
        .then(res => res.json())
        .then(data => {
          const newCards = data.products.map((card: TProduct) => ({
            ...card,
            isFavorite: false,
          }));

          setCards(prev => [...prev, ...newCards]); // добавляем к уже отображаемым
          setSkip(prev => prev + limit);
          setTotal(data.total);
        });
    },
    [skip],
  );

  // первый рендер — сразу подгружаем 5 карточек
  useEffect(() => {
    loadCards(DEFAULT_PAGE_SIZE);
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

      {/* Кнопка Ещё */}
      {cards.length < total && (
        <div style={{marginTop: 16}}>
          <Button
            onClick={() =>
              loadCards(typeof numberCard === 'number' ? numberCard : DEFAULT_PAGE_SIZE)
            }>
            Ещё
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomePage;

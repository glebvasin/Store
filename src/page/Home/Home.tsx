import React, {useState, useEffect, useCallback, useMemo} from 'react';

import Header from '@components/header/Header';
import CardListWithFilter from '@components/сardListWithFilter/CardListWithFilter';

import {TProduct, TProductWithFavorite} from '../../api/products/types';

const HomePage = () => {
  // текущие загруженные карточки
  const [cards, setCards] = useState<TProductWithFavorite[]>([]);
  // всего карточек на сервере
  const [total, setTotal] = useState(0);
  const [searchTitle, setSearchTitle] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(searchTitle);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [loading, setLoading] = useState(true);

  const toggleFavorite = useCallback((id: number) => {
    setCards(prev =>
      prev.map(card => (card.id === id ? {...card, isFavorite: !card.isFavorite} : card)),
    );
  }, []);

  const favorites = useMemo(() => cards.filter(card => card.isFavorite), [cards]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTitle);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchTitle]);

  const loadCards = useCallback(() => {
    const skip = (page - 1) * pageSize;

    fetch(
      `https://dummyjson.com/products/search?q=${debouncedSearch.trim()}&limit=${pageSize}&skip=${skip}`,
    )
      .then(res => res.json())
      .then(data => {
        const newCards = data.products.map((card: TProduct) => ({
          ...card,
          isFavorite: false,
        }));

        setCards(newCards);
        setTotal(data.total);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, pageSize, debouncedSearch]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

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
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        total={total}
        loading={loading}
      />
    </div>
  );
};

export default HomePage;

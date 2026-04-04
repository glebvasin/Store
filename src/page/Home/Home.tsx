import {useGetProductsQuery} from '@api/products/api';
import {TProductWithFavorite, TProduct} from '@api/products/types';
import React, {useState, useEffect, useCallback, useMemo} from 'react';

import Header from '@components/header/Header';
import CardListWithFilter from '@components/сardListWithFilter/CardListWithFilter';

const HomePage = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(searchTitle);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  //  хранение избранного отдельно
  const [favoritesMap, setFavoritesMap] = useState<Record<number, boolean>>({});

  // debounce поиска
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTitle);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchTitle]);

  // pagination → skip
  const skip = (page - 1) * pageSize;

  // 🔥 RTK Query
  const {data, isLoading} = useGetProductsQuery({
    debouncedSearch,
    pageSize,
    skip,
  });

  // переключение избранного
  const toggleFavorite = useCallback((id: number) => {
    setFavoritesMap(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  // формирование карточек
  const cards = useMemo<TProductWithFavorite[]>(() => {
    if (!data) return [];

    return data.products.map((card: TProduct) => ({
      ...card,
      isFavorite: !!favoritesMap[card.id],
    }));
  }, [data, favoritesMap]);

  // список избранных
  const favorites = useMemo(() => cards.filter(card => card.isFavorite), [cards]);

  const total = data?.total ?? 0;

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
        loading={isLoading}
      />
    </div>
  );
};

export default HomePage;

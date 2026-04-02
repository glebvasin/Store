import React, {useEffect, useState} from 'react';

import Button from '@components/button/basic/Button';

import MainSelectDropdown from '../dropdown/mainSelect/MainSelect';

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

  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: (size: number) => void;
  total: number;

  loading: boolean;
}

const CardListWithFilter: React.FC<CardListWithFilterProps> = ({
  searchTitle,
  setSearchTitle,
  selectedCategory,
  setSelectedCategory,
  cards,
  toggleFavorite,
  page,
  setPage,
  pageSize,
  setPageSize,
  total,
  loading,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    fetch('https://dummyjson.com/products/category-list')
      .then(res => res.json())
      .then((data: string[]) => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  // const categories = Array.from(new Set(cards.map(card => card.category)));
  // const normalizedSearch = searchTitle.trim().toLowerCase();

  const filteredCards = cards.filter(card => {
    const matchCategory = selectedCategory ? card.category === selectedCategory : true;
    // const matchTitle = normalizedSearch
    //   ? card.title.toLowerCase().includes(normalizedSearch)
    //   : true;
    return matchCategory;
  });

  const totalPages = Math.ceil(total / pageSize);

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
          placeholder={categories.length === 0 ? 'Загрузка категорий...' : 'Все категории'}
          options={categories.map(cat => ({value: cat, label: cat}))}
        />

        <MainSelectDropdown
          value={String(pageSize)}
          onChange={str => {
            setPageSize(Number(str));
            setPage(1);
          }}
          placeholder="Количество карточек"
          options={['3', '5', '10', '15'].map(n => ({value: n, label: n}))}
          placeholderValue={'20'}
        />
      </div>

      <div className={styles.pagination}>
        <Button disabled={page === 1} onClick={() => setPage(prev => prev - 1)}>
          Назад
        </Button>

        <span>{loading ? 'Загрузка...' : `${page} / ${totalPages}`}</span>

        <Button disabled={page === totalPages} onClick={() => setPage(prev => prev + 1)}>
          Вперёд
        </Button>
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

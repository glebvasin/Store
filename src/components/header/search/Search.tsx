// Search.tsx
import React from 'react';

import Button from '@components/buttons/basicButton/Button';

import styles from './search.module.scss';

interface SearchProps {
  searchTitle: string;
  onSearch: (query: string) => void;
}

const Search = ({onSearch, searchTitle}: SearchProps) => {
  const handleSearch = () => {
    onSearch(searchTitle.trim());
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        value={searchTitle}
        placeholder="Поиск товара..."
        onChange={e => onSearch(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default Search;

// Search.tsx
import React from 'react';

import styles from './search.module.scss';

interface SearchProps {
  searchTitle: string;
  onSearch: (query: string) => void;
}

const Search = ({onSearch, searchTitle}: SearchProps) => {
  return (
    <div className={styles.search}>
      <input
        type="text"
        value={searchTitle}
        placeholder="Поиск товара..."
        onChange={e => onSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;

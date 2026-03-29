// Search.tsx
import React, {useState} from 'react';

import Button from '@components/button/Button';

import styles from './search.module.scss';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({onSearch}) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query.trim());
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        value={query}
        placeholder="Поиск товара..."
        onChange={e => setQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default Search;

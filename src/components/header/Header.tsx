import React from 'react';

import Button from '@components/buttons/basicButton/Button';
import Search from '@components/header/search/Search';

import styles from './header.module.scss';
interface HeaderProps {
  searchTitle: string;
  setSearchTitle: (searchTitle: string) => void;
}

const Header = ({setSearchTitle, searchTitle}: HeaderProps) => {
  return (
    <div className={styles.header}>
      <img src="!#" alt="Логотип" />

      <Search searchTitle={searchTitle} onSearch={setSearchTitle} />

      <Button>Корзина</Button>
    </div>
  );
};

export default Header;

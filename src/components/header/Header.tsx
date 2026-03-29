import React from 'react';

import Button from '@components/button/Button';
import Search from '@components/search/Search';

import styles from './header.module.scss';
interface HeaderProps {
  setSearchTitle: (searchTitle: string) => void;
}

const Header = ({setSearchTitle}: HeaderProps) => {
  return (
    <div className={styles.header}>
      <img src="!#" alt="Логотип" />

      <Search onSearch={setSearchTitle} />

      <Button>Корзина</Button>
    </div>
  );
};

export default Header;

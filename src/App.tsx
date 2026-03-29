import React, {useState} from 'react';

import Header from '@components/header/Header';
import CardListWithFilter from '@components/сardListWithFilter/CardListWithFilter';

import styles from './app.module.scss';

const App = () => {
  const [searchTitle, setSearchTitle] = useState('');
  return (
    <div className={styles.app}>
      <Header searchTitle={searchTitle} setSearchTitle={setSearchTitle} />
      <CardListWithFilter searchTitle={searchTitle} setSearchTitle={setSearchTitle} />
    </div>
  );
};

export default App;

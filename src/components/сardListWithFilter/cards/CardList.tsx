import React from 'react';

import Card from './card/Card';
import styles from './cardList.module.scss';
import {cards} from './helper';

const CardList = () => {
  return (
    <div className={styles.ppp}>
      <div className={styles.grid}>
        {cards.map(card => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            category={card.category}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;

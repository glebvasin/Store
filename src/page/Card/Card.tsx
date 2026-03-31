import {useParams} from 'react-router-dom';

import {TProduct} from 'api/products/types';
import React, {useEffect, useState} from 'react';

import PageWrapper from './Wrapper';

const CardPage = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(true);

  const [card, setCard] = useState<TProduct | null>(null);

  const cardId = Number(id);

  useEffect(() => {
    if (!cardId) return;

    fetch(`https://dummyjson.com/products/${cardId}`)
      .then(res => res.json())
      .then(data => setCard(data))
      .finally(() => setLoading(false));
  }, [cardId]);

  if (loading) {
    return <PageWrapper>Загрузка...</PageWrapper>;
  }

  if (!card) {
    return <PageWrapper>Карточка не найдена</PageWrapper>;
  }

  return (
    <PageWrapper>
      <h1>{card.title}</h1>
      <p>{card.description}</p>
      <p>Категория: {card.category}</p>
    </PageWrapper>
  );
};

export default CardPage;

import {useParams} from 'react-router-dom';

import {useGetProductByIdQuery} from '@api/products/api';
import React from 'react';

import PageWrapper from './Wrapper';

const CardPage = () => {
  const {id} = useParams();

  const cardId = Number(id);

  const {data, isLoading} = useGetProductByIdQuery(
    {
      cardId,
    },
    {skip: isNaN(cardId)},
  );

  if (isLoading) {
    return <PageWrapper>Загрузка...</PageWrapper>;
  }

  if (!data) {
    return <PageWrapper>Карточка не найдена</PageWrapper>;
  }

  return (
    <PageWrapper>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <p>Категория: {data.category}</p>
    </PageWrapper>
  );
};

export default CardPage;

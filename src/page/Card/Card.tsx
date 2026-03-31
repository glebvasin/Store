import {useParams, useNavigate} from 'react-router-dom';

import React from 'react';

import Button from '@components/button/basic/Button';
import {cards as initialCards} from '@components/сardListWithFilter/cards/helper';

const CardPage = () => {
  const {id} = useParams();
  const navigate = useNavigate(); // <-- хук для навигации

  const cardId = Number(id);
  console.log(cardId);
  const card = initialCards.find(c => c.id === cardId);

  const goHome = () => navigate('/');

  if (!card) {
    return (
      <div>
        <Button onClick={goHome}>Главная</Button>
        <div>Карточка не найдена</div>
      </div>
    );
  }

  return (
    <div>
      <Button onClick={goHome}>Главная</Button>
      <h1>{card.title}</h1>
      <p>{card.description}</p>
      <p>Категория: {card.category}</p>
    </div>
  );
};

export default CardPage;

import {useNavigate} from 'react-router-dom';

import {ReactNode} from 'react';
import React from 'react';

import Button from '@components/button/basic/Button';

const PageWrapper = ({children}: {children: ReactNode}) => {
  const navigate = useNavigate();
  const goHome = () => navigate('/');

  return (
    <div>
      <Button onClick={goHome}>Главная</Button>
      <div>{children}</div>
    </div>
  );
};

export default PageWrapper;

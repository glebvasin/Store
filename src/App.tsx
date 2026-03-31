import {Routes, Route} from 'react-router-dom';

import React from 'react';

import CardPage from './page/Card/Card';
import HomePage from './page/Home/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/card/:id" element={<CardPage />} />
    </Routes>
  );
};

export default App;

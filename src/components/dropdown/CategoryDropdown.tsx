// CategoryDropdown.tsx
import React from 'react';

import styles from './categoryDropdown.module.scss';

interface CategoryDropdownProps {
  categories: string[]; // массив категорий для выбора
  selected: string; // выбранная категория
  onChange: (category: string) => void; // коллбек при выборе
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({categories, selected, onChange}) => {
  return (
    <select className={styles.dropdown} value={selected} onChange={e => onChange(e.target.value)}>
      <option value="">Все категории</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};

export default CategoryDropdown;

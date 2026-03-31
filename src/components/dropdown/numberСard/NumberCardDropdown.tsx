import React from 'react';

import styles from './numberCardDropdown.module.scss';

interface NumberCardDropdownProps {
  value: number; // выбранное число карточек
  onChange: (value: number) => void; // коллбек при выборе
  placeholder?: string; // текст по умолчанию
  options?: number[]; // варианты для выбора
}

const NumberCardDropdown: React.FC<NumberCardDropdownProps> = ({
  value,
  onChange,
  placeholder = 'Количество карточек',
  options = [3, 5, 10, 15],
}) => {
  return (
    <select
      className={styles.dropdown}
      value={value}
      onChange={e => onChange(Number(e.target.value))}>
      {/* placeholder скрыт при выборе значения */}
      <option value="" disabled hidden>
        {placeholder}
      </option>

      {options.map(opt => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

export default NumberCardDropdown;

import React from 'react';

import styles from './numberCardDropdown.module.scss';

interface NumberCardDropdownProps {
  value: number | '';
  onChange: (value: number) => void;
  placeholder?: string;
  options?: number[];
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
      <option value="" disabled>
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

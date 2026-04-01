import React from 'react';

import styles from './mainSelectDropdown.module.scss';

interface Option<T> {
  value: T;
  label: string;
}

interface MainSelectDropdownProps<T> {
  value: T | '';
  onChange: (value: T) => void;
  options: Option<T>[];
  placeholder?: string;
}

const MainSelectDropdown = <T extends string | number>({
  value,
  onChange,
  options,
  placeholder,
}: MainSelectDropdownProps<T>) => {
  return (
    <select
      className={styles.dropdown}
      value={value}
      onChange={e => {
        const val = e.target.value;
        onChange((typeof options[0].value === 'number' ? Number(val) : val) as T);
      }}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map(opt => (
        <option key={String(opt.value)} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default MainSelectDropdown;

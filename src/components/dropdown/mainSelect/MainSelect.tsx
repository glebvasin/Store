import React from 'react';

import styles from './mainSelect.module.scss';

interface Option {
  value: string;
  label: string;
}

interface MainSelectDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  placeholderValue?: string;
}

const MainSelectDropdown = ({
  value,
  onChange,
  options,
  placeholder,
  placeholderValue,
}: MainSelectDropdownProps) => {
  return (
    <select className={styles.dropdown} value={value} onChange={e => onChange(e.target.value)}>
      {placeholder && <option value={placeholderValue || ''}>{placeholder}</option>}

      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default MainSelectDropdown;

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
}

const MainSelectDropdown = ({value, onChange, options, placeholder}: MainSelectDropdownProps) => {
  return (
    <select className={styles.dropdown} value={value} onChange={e => onChange(e.target.value)}>
      <option value="">{placeholder}</option>
      {options.map(opt => (
        <option key={String(opt.value)} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default MainSelectDropdown;

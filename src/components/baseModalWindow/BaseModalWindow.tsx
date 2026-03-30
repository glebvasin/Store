import React from 'react';

import styles from './baseModalWindow.module.scss';

interface BaseModalWindowProps {
  isOpen: boolean; // открыто или нет
  onClose: () => void; // как закрыть
  children: React.ReactNode;
}

const BaseModalWindow = ({isOpen, onClose, children}: BaseModalWindowProps) => {
  if (!isOpen) return null; // ничего не рендерим, если модальное закрыто

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default BaseModalWindow;

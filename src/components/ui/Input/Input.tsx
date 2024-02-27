import React from 'react';
import { IInput } from './input.types';

import styles from './styles.module.scss';

const Input: React.FC<IInput> = ({ label, ...props }) => {
  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}
      <input {...props} className={`${styles.container_input} ${props.className}`} />
    </div>
  );
};

export default Input;

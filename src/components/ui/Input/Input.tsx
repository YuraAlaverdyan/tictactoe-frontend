import React from 'react';
import { IInput } from './input.types';

import styles from './styles.module.scss';

const Input: React.FC<IInput> = ({ ...props }) => {
  return <input {...props} type="text" className={`${styles.input} ${props.className}`} />;
};

export default Input;
import React from 'react';

import { IButton } from './button.types';
import styles from './styles.module.scss';

const Button: React.FC<IButton> = ({ color, ...props }) => {
  return (
    <button {...props} className={`${styles.button} ${props.className} ${styles[color || '']}`}>
      <p>{props.children}</p>
    </button>
  );
};

export default Button;

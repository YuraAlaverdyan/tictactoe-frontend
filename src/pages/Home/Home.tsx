import React, { useState } from 'react';

import styles from './styles.module.scss';
import Input from 'components/ui/Input/Input';
import Button from 'components/ui/Button/Button';

const Home: React.FC = () => {
  const [userName, setUserName] = useState<string>('');

  return (
    <div className={styles.container}>
      <form className={styles.container_form}>
        <p>Welcome</p>
        <Input label='Player Name' value={userName} onChange={(e) => setUserName(e.target.value)} />
        <Button color='blue'>Submit</Button>
      </form>
    </div>
  );
};

export default Home;

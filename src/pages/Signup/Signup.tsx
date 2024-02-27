import React, { FormEvent, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { resetAuthSlice, signup } from 'store/slice/auth/authSlice';

import Input from 'components/ui/Input/Input';
import Button from 'components/ui/Button/Button';

import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup: React.FC = () => {
  const [user, setUser] = useState<{
    username: string;
    password: string;
  }>({ username: '', password: '' });
  const { isSuccess, isLoading, error, message } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signup(user))
  };

  useEffect(() => {
    if(isSuccess) {
      toast.success(message)
      navigate('/')
      return
    }
    if(error) {
      toast.error(error.message)
    }
    dispatch(resetAuthSlice())
  }, [isLoading, error, isSuccess]);

  return (
    <div className={styles.container}>
      <form className={styles.container_form} onSubmit={handleSignup}>
        <p>Welcome</p>
        <Input label="Username" value={user.username}
               disabled={isLoading}
               onChange={(e) => setUser({ ...user, username: e.target.value })} />
        <Input
          label="Password"
          value={user.password}
          disabled={isLoading}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
        />
        <Button color="red" disabled={isLoading}>Sign Up</Button>
      </form>
    </div>
  );
};

export default Signup;

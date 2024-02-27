import React, { useEffect } from 'react';

import styles from './styles.module.scss'
import useSocketIO from 'hooks/useSocket';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUser } from 'store/slice/game/gameSlice';
import OnlineUsers from 'components/OnlineUsers/OnlineUsers';

const Game:React.FC = () => {
  const { isConnected, sendMessage } = useSocketIO(process.env.REACT_APP_API_URL || '');
  const { user } = useAppSelector(state => state.game)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, []);

  useEffect(() => {
    if(isConnected) {
      sendMessage('loggedIn', user.id)
    }
  }, [isConnected, user.id]);

  return (
    <div className={styles.container}>
      <OnlineUsers />
    </div>
  )
}

export default Game
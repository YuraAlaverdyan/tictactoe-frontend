import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import styles from './styles.module.scss'
import { invitePlayer, resetInviteState } from '../../store/slice/game/gameSlice';
import { toast } from 'react-toastify';

const OnlineUsers:React.FC = () => {
  const { onlineUsers, user:currentUser } = useAppSelector(state => state.game)
  const { isLoading, error, isSuccess, message } = useAppSelector(state => state.game.invitePlayer)


  const dispatch = useAppDispatch()

  const handleInvitePlayer = (userId: string) => {
    dispatch(invitePlayer(userId))
  }

  useEffect(() => {
    if (isSuccess) {
      toast(message)
    }
    if (error) {
      toast(message)
    }
    dispatch(resetInviteState())
  }, [isSuccess, isLoading]);

  return (
    <div className={styles.container}>
    <div className={styles.onlineUsers}>
      <header>
        <h1 className={styles.onlineUsers_title}><span className={styles.onlineUsers_title_top}>Online</span><span
          className={styles.onlineUsers_title_bottom}>Users</span></h1>
      </header>
      <main className={styles.onlineUsers__profiles}>
        {
          onlineUsers ? onlineUsers.map(user => {
              return <article className={styles.onlineUsers__profile} key={user.username}>
                <span className={styles.onlineUsers__name}>{user.username}</span>
                <span className={styles.onlineUsers__value}>{user.wins}<span>wins</span></span>
                <span className={styles.onlineUsers__invite}>{user.username === currentUser.username ? 'You' : <span onClick={() => handleInvitePlayer(user._id)}>Invite to play</span>}</span>
              </article>
            }) : <span>Loading...</span>
        }
      </main>
    </div>
    </div>
  );
}

export default OnlineUsers;
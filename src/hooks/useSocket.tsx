import { useState, useEffect } from 'react';

import io, { Socket } from 'socket.io-client';
import { useAppDispatch } from 'store/hooks';
import { setOnlineUsers } from 'store/slice/game/gameSlice';
import { IOnlineUser } from 'store/slice/game/game.type';

interface SocketIOOptions {
  autoConnect?: boolean;
  reconnection?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
  reconnectionDelayMax?: number;
  randomizationFactor?: number;
}

interface UseSocketIOResult {
  socket: Socket | null;
  isConnected: boolean;
  sendMessage: (messageType: string, data: any) => void;
}

const useSocketIO = (url: string, options?: SocketIOOptions): UseSocketIOResult => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const dispatch = useAppDispatch()

  useEffect(() => {
    const socketInstance = io(url, options);

    socketInstance.on('connect', () => {
      setIsConnected(true);
    });

    socketInstance.on('onlineUsers', (data: { users: IOnlineUser[] }) => {
      dispatch(setOnlineUsers(data.users))
    })

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [url, options]);

    const sendMessage = (messageType: string, data: any) => {
    if (socket && isConnected) {
      socket.emit(messageType, data);
    }
  };

  return { socket, isConnected, sendMessage };
};

export default useSocketIO;
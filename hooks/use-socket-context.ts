import { createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { TSocket } from '../common/types';

const defaultValues: {
  socket: TSocket | null;
  setSocket: (val: TSocket) => void;
} = {
  socket: null,
  setSocket: () => {},
};

export const SocketContext = createContext(defaultValues);

const useSocketContext = () => {
  const { socket, setSocket } = useContext(SocketContext);

  useEffect(() => {
    const s = io('/', { path: '/api/socketio' });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return { socket, setSocket };
};

export default useSocketContext;

import { useEffect, useState } from 'react';
import useSocketContext from './use-socket-context';

const useOnOpenPeer = ({ peer, roomId }: { peer: any; roomId: string }) => {
  const [me, setMe] = useState('');
  const { socket } = useSocketContext();

  useEffect(() => {
    if (!peer || !socket) return;

    peer.on('open', () => {
      setMe(peer.id);
      socket.emit('join-room', { userId: peer.id, roomId });

      console.log('Your device ID is: ', peer.id);
    });
  }, [peer, socket]);

  return { me };
};

export default useOnOpenPeer;

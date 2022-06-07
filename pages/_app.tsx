import { useState } from 'react';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';

import { SocketContext } from '../hooks/use-socket-context';
import { TSocket } from '../common/types';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [socket, setSocket] = useState<TSocket | null>(null);

  return (
    <UserProvider>
      <SocketContext.Provider value={{ socket, setSocket }}>
        <Component {...pageProps} />
      </SocketContext.Provider>
    </UserProvider>
  );
}

export default MyApp;

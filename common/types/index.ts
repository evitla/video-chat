import { Socket as NetSocket } from 'net';
import { Server as HTTPServer } from 'http';
import { NextApiResponse } from 'next/types';
import { Server as SocketIOServer } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Socket as ClientSocket } from 'socket.io-client';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io: SocketIOServer;
    };
  };
};

export type TSocket = ClientSocket<DefaultEventsMap, DefaultEventsMap>;

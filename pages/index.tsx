import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ROOM_NAME } from 'common/constants';
import { createRoomId, createHost } from '@common/utils';

import { Header, WelcomeContainer } from '../components';

const Home: NextPage = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');

  function createRoom() {
    const roomId = createRoomId();

    createHost(roomId);
    router.push(`/${ROOM_NAME}/${roomId}`);
  }

  function joinRoom() {
    router.push(`/${ROOM_NAME}/${roomId}`);
  }

  return (
    <>
      <Header />

      <WelcomeContainer>
        <button
          onClick={createRoom}
          className="p-3 bg-emerald-300 hover:bg-indigo-200 rounded-md text-emerald-800 text-sm founded-medium"
        >
          Jańa qora
        </button>

        <input
          onChange={(e: any) => setRoomId(e.target.value)}
          placeholder="Enter or paste room id"
          className="px-4 py-1 w-80 rounded-md"
        />

        <button
          onClick={joinRoom}
          disabled={roomId.length == 0}
          className="p-3 bg-emerald-500 hover:bg-indigo-300 rounded-md text-emerald-800 text-sm founded-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Join
        </button>
      </WelcomeContainer>
    </>
  );
};

export default Home;

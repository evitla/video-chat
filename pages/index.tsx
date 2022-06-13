import { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';

import { JoinRoom, WelcomeContainer } from '../components';
import { JoinButton } from '../components/style';

const Home: NextPage = () => {
  const [value, setValue] = useState('');
  return (
    <WelcomeContainer>
      <div className="mt-5 sm:flex sm:justify-center lg:justify-start">
        <Link href={`/qora/${uuid()}`}>
          <button className="rounded bg-[#000] text-white px-2 mr-3">
            Jańa qora
          </button>
        </Link>

        <JoinRoom setValue={setValue} />
        <Link href={value.length > 0 ? `/qora/${value}` : '/'}>
          <JoinButton>Join</JoinButton>
        </Link>
      </div>
    </WelcomeContainer>
  );
};

export default Home;

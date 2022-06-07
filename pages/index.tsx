import type { NextPage } from 'next';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';

import { JoinRoom, WelcomeContainer } from '../components';
import { CameraIcon } from '../assets/icons';
import { Button, JoinButton } from '../components/style';

const Home: NextPage = () => {
  return (
    <WelcomeContainer>
      <div className="mt-5 sm:flex sm:justify-center lg:justify-start">
        <Link href={`/qora/${uuid()}`}>
          <button className="rounded bg-[#000] text-white px-2 mr-3">
            Jańa qora
          </button>
        </Link>

        <JoinRoom />
        <JoinButton disabled={true}>Join</JoinButton>
      </div>
    </WelcomeContainer>
  );
};

export default Home;

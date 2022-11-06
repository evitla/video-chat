import { useContext } from 'react';

import { Nullable } from '@common/types';
import { UsersStateContext } from 'contexts/users-settings';

import SharedScreen from '@components/shared-screen';

export default function SharedScreenStream({
  sharedScreen,
  fullscreen,
}: {
  sharedScreen: Nullable<MediaStreamTrack>;
  fullscreen: boolean;
}) {
  const { sharedScreenTrack } = useContext(UsersStateContext);
  const screenTrack = sharedScreen ?? sharedScreenTrack;

  return screenTrack ? (
    <div
      className={`flex justify-center ${
        fullscreen ? 'basis-6/6' : 'basis-5/6'
      }`}
    >
      <SharedScreen sharedScreenTrack={screenTrack} />
    </div>
  ) : null;
}

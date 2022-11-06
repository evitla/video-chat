import { useContext } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import { MYSELF } from '@common/constants';
import { UsersConnectionContext } from 'contexts/users-connection';

import VideoContainer from '@components/video-container';
import { PeerVideo } from '..';

export default function MyStream({
  stream,
  muted,
  visible,
}: {
  stream: MediaStream;
  muted: boolean;
  visible: boolean;
}) {
  const avatar = useUser().user!.picture || '';
  const { myId } = useContext(UsersConnectionContext);

  return (
    <VideoContainer
      id={myId}
      muted={muted}
      visible={visible}
      stream={stream}
      userPicture={avatar}
    >
      <PeerVideo stream={stream} name={MYSELF} isMe={true} />
    </VideoContainer>
  );
}

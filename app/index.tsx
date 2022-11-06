import { useContext, useEffect, useState } from 'react';

import { ControlPanel, Chat, Status } from '@components/index';
import { Streams, SharedScreenStream } from '@components/streams';
import { usePeer, useScreen } from '@hooks/index';
import useMediaStream from '@hooks/use-media-stream';
import { SocketContext } from '@pages/_app';
import { UsersSettingsProvider, UsersConnectionProvider } from 'contexts';
import { useRouter } from 'next/router';
import { MediaConnection } from 'peerjs';
import { toast, ToastContainer } from 'react-toastify';

import { LoaderError, Modal } from '@common/components';
import { FAILURE_MSG, LOADER_PEER_MSG, TOAST_PROPS } from '@common/constants';
import { Kind, PeerId } from '@common/types';

export default function App({ stream }: { stream: MediaStream }) {
  const router = useRouter();
  const socket = useContext(SocketContext);

  const { muted, visible, toggle, toggleVideo } = useMediaStream(stream);
  const { peer, myId, isPeerReady } = usePeer(stream);
  const { startShare, stopShare, screenTrack } = useScreen(stream);

  const [modal, setModal] = useState<'hidden' | 'chat' | 'status' | 'close'>(
    'hidden'
  );
  const [fullscreen, setFullscreen] = useState(false);

  function replaceTrack(track: MediaStreamTrack) {
    return (peer: MediaConnection) => {
      const sender = peer.peerConnection
        ?.getSenders()
        .find((s) => s.track?.kind === track.kind);

      sender?.replaceTrack(track);
    };
  }

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on('host:muted-user', (peerId: PeerId) => {
      if (myId === peerId) {
        toggleKind('audio');
        toast('you are muted by host');
      } else {
        toast('user muted by host');
      }
    });

    return () => {
      socket.off('host:muted-user');
    };
  }, [myId]);

  if (!isPeerReady) return <LoaderError msg={LOADER_PEER_MSG} />;
  if (!peer) return <LoaderError msg={FAILURE_MSG} />;

  async function toggleKind(kind: Kind, users?: MediaConnection[]) {
    switch (kind) {
      case 'audio': {
        toggle('audio')(stream);
        socket.emit('user:toggle-audio', myId);
        return;
      }
      case 'video': {
        toggleVideo((newVideoTrack: MediaStreamTrack) =>
          users!.forEach(replaceTrack(newVideoTrack))
        );
        socket.emit('user:toggle-video', myId);
        return;
      }
      case 'screen': {
        if (screenTrack) {
          stopShare(screenTrack);
          socket.emit('user:stop-share-screen');
          setFullscreen(false);
          toast('Stopped presenting screen');
        } else {
          await startShare(
            () => {
              socket.emit('user:share-screen');
              toast('Starting presenting screen');
            },
            () => socket.emit('user:stop-share-screen')
          );
        }
        return;
      }
      case 'fullscreen': {
        setFullscreen(!fullscreen);
        return;
      }
      case 'chat': {
        modal == 'chat' ? setModal('close') : setModal('chat');
        return;
      }
      case 'users': {
        modal == 'status' ? setModal('close') : setModal('status');
        return;
      }
      default:
        break;
    }
  }

  return (
    <div className="flex">
      <UsersSettingsProvider>
        <div className="sm:flex hidden flex-col p-4 w-full h-screen">
          <UsersConnectionProvider stream={stream} myId={myId} peer={peer}>
            <div className="flex h-full place-items-center place-content-center gap-4">
              <SharedScreenStream
                sharedScreen={screenTrack}
                fullscreen={fullscreen}
              />

              <Streams
                stream={stream}
                muted={muted}
                visible={visible}
                sharedScreen={screenTrack}
                fullscreen={fullscreen}
              />
            </div>

            <div className="flex items-center">
              <ControlPanel
                visible={visible}
                muted={muted}
                screenTrack={Boolean(screenTrack)}
                chat={modal == 'chat'}
                onToggle={toggleKind}
                onLeave={() => router.push('/')}
              />
            </div>
          </UsersConnectionProvider>
        </div>

        <Modal
          title={
            modal === 'chat'
              ? 'Meeting Chat'
              : modal === 'status'
              ? 'People'
              : ''
          }
          modal={modal}
          onClose={() => setModal('close')}
        >
          <div className={modal !== 'chat' ? 'hidden' : ''}>
            <Chat />
          </div>
          <div className={modal !== 'status' ? 'hidden' : ''}>
            <Status muted={muted} visible={visible} />
          </div>
        </Modal>
      </UsersSettingsProvider>
      <ToastContainer {...TOAST_PROPS} />
    </div>
  );
}

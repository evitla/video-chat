import { useState } from 'react';

import { Nullable } from '@common/types';
import { error } from '@common/utils';

const useScreen = (stream: MediaStream) => {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'rejected'
  >('idle');
  const [screenTrack, setScreenTrack] =
    useState<Nullable<MediaStreamTrack>>(null);

  async function startShare(onstarted: () => void, onended: () => void) {
    setStatus('loading');

    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      const [screenTrack] = screenStream.getTracks();

      setScreenTrack(screenTrack);
      stream.addTrack(screenTrack);
      setStatus('success');

      onstarted();

      screenTrack.onended = () => {
        stopShare(screenTrack);
        onended();
      };
    } catch (e) {
      error('Failed to share screen')(e);
      setStatus('rejected');
    }
  }

  function stopShare(screenTrack: MediaStreamTrack) {
    screenTrack.stop();
    stream.removeTrack(screenTrack);
    setScreenTrack(null);
    setStatus('idle');
  }

  return {
    screenTrack,
    startShare,
    stopShare,
    isIdle: status === 'idle',
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'rejected',
  };
};

export default useScreen;

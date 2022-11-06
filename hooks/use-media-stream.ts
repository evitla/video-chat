import React from 'react';
import { Status, Nullable } from '@common/types';

export default function useStream(stream: Nullable<MediaStream> = null) {
  const [state, setState] = React.useState<Nullable<MediaStream>>(stream);
  const [status, setStatus] = React.useState<Status>('loading');

  const [m, setM] = React.useState(false);
  const [v, setV] = React.useState(true);

  React.useEffect(() => {
    if (stream) {
      setStatus('idle');

      const [audio, video] = stream.getTracks();
      setM(!audio.enabled);
      setV(video.enabled);
    } else {
      (async function createStream() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
          });

          setState(stream);
          setStatus('success');
        } catch (error) {
          setStatus('rejected');
          console.error('Access denied for audio and video stream', error);
        }
      })();
    }
  }, []);

  function toggle(kind: 'audio' | 'video') {
    return (s = state) => {
      if (!s) throw new Error('Failed. Could not find stream');

      const track = s.getTracks().find((track) => track.kind == kind);

      if (!track)
        throw new Error(`Failed. Could not find ${kind} track in given stream`);

      if (track.enabled) {
        track.enabled = false;
        track.kind == 'audio' ? setM(true) : setV(false);
      } else {
        track.enabled = true;
        track.kind == 'audio' ? setM(false) : setV(true);
      }
    };
  }

  async function toggleVideo(cb?: unknown) {
    if (!state) throw new Error('There is no a video stream to toggle');

    const videoTrack = state.getVideoTracks()[0];

    if (videoTrack.readyState === 'live') {
      videoTrack.enabled = false;
      videoTrack.stop(); // * turns off web cam light indicator
      setV(false);
    } else {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const newVideoTrack = newStream.getVideoTracks()[0];

      if (typeof cb === 'function') {
        cb(newVideoTrack);
      }

      state.removeTrack(videoTrack);

      const [screenTrack] = state.getVideoTracks();

      if (screenTrack) {
        state.removeTrack(screenTrack);
        state.addTrack(newVideoTrack);
        state.addTrack(screenTrack);
      } else state.addTrack(newVideoTrack);

      setState(state);
      setV(true);
    }
  }

  return {
    stream: state,
    muted: m,
    visible: v,
    toggle,
    toggleAudio: toggle('audio'),
    toggleVideo,
    isLoading: status == 'loading',
    isError: status == 'rejected',
    isSuccess: status == 'success' || status == 'idle',
  };
}

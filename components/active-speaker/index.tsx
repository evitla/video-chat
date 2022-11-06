import React from 'react';

import useIsAudioActive from '@hooks/use-is-audio-active';
import { SpeakerIcon } from 'assets/icons';

const ActiveSpeaker = ({ stream }: { stream: MediaStream }) =>
  useIsAudioActive({ source: stream }) ? (
    <div className="rounded-full bg-indigo-400 absolute top-3 right-3 p-1">
      <SpeakerIcon />
    </div>
  ) : null;

export default ActiveSpeaker;

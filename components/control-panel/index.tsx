import { useState } from 'react';
import { VideoIcon, MicrophoneIcon, HangUpIcon } from '../../assets/icons';

const ControlPanel = ({ onVideo, onAudio, onHangUp, constraints }: any) => {
  const [videoActive, setVideoActive] = useState(constraints.video);
  const [audioActive, setAudioActive] = useState(constraints.audio);

  const handleVideo = () => {
    setVideoActive(!videoActive);
    onVideo();
  };

  const handleAudio = () => {
    setAudioActive(!audioActive);
    onAudio();
  };

  return (
    <div className="flex gap-4 place-content-center">
      <button
        onClick={handleVideo}
        type="button"
        className="inline-flex items-center p-2 border border-transparent rounded-xl shadow-sm text-white bg-slate-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
      >
        <VideoIcon />
        {!videoActive && (
          <div className="bg-current absolute w-3/4 h-0.5 left-1/2 -translate-x-1/2 rotate-45" />
        )}
      </button>
      <button
        onClick={handleAudio}
        type="button"
        className="inline-flex items-center p-2 border border-transparent rounded-xl shadow-sm text-white bg-slate-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
      >
        <MicrophoneIcon />
        {!audioActive && (
          <div className="bg-current absolute w-3/4 h-0.5 left-1/2 -translate-x-1/2 rotate-45" />
        )}
      </button>
      <button
        onClick={onHangUp}
        type="button"
        className="inline-flex items-center p-2 border border-transparent rounded-xl shadow-sm text-white bg-red-600 hover:bg-red-400	focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <HangUpIcon />
      </button>
    </div>
  );
};

export default ControlPanel;

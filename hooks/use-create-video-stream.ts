import { useEffect, useState } from 'react';

const useCreateVideoStream = (constraints = { audio: false, video: true }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    async function getStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(stream);
      } catch (error) {
        console.log('Access denied for audio and video stream', error);
      }
    }

    getStream();
  }, []);

  return { stream };
};

export default useCreateVideoStream;

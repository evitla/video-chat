import { Dispatch, SetStateAction, useEffect } from 'react';
import { useAddVideoStream } from './';

const useCreateVideoOnPageOpen = ({
  id,
  stream,
  addVideoStream,
}: {
  id: string;
  stream: MediaStream | null;
  addVideoStream: (id: string, stream: MediaStream) => void;
}) => {
  useEffect(() => {
    if (!stream) return;

    addVideoStream(id, stream);
  }, [id, addVideoStream, stream]);
};

export default useCreateVideoOnPageOpen;

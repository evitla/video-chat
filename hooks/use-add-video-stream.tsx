import { Dispatch, SetStateAction, useCallback } from 'react';

const useAddVideoStream = ({
  setVideoRefs,
  setVideos,
}: {
  setVideoRefs: Dispatch<SetStateAction<Record<string, HTMLDivElement>>>;
  setVideos: Dispatch<SetStateAction<JSX.Element[]>>;
}) => {
  const addVideoStream = useCallback((id: string, stream: MediaStream) => {
    if (!id) return;

    setVideos((prev: JSX.Element[]) => [
      ...prev,
      <div
        key={id}
        ref={(node) => {
          if (node) setVideoRefs((prev) => ({ ...prev, [id]: node }));
        }}
      >
        <video
          ref={(node) => {
            if (node) node.srcObject = stream;
          }}
          className="rounded-3xl max-w-md max-h-80 mr-4"
          muted
          autoPlay
        />
        <p className="font-medium">
          <span className="text-blue-600">{id}</span>
        </p>
      </div>,
    ]);
  }, []);

  return addVideoStream;
};

export default useAddVideoStream;

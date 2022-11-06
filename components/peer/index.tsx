import { memo } from 'react';

const PeerVideo = ({
  stream,
  name,
  isMe,
}: {
  stream: MediaStream;
  name: string;
  isMe?: boolean;
}) => (
  <div className="w-96">
    <video
      ref={(node) => {
        if (node) node.srcObject = stream;
      }}
      autoPlay
      muted={isMe}
      className="rounded-[12px] aspect-video object-cover -scale-x-100"
    />

    <p className="font-medium absolute bottom-3 left-4 text-xs">
      <span className="text-white">{name}</span>
    </p>
  </div>
);

export default memo(PeerVideo);

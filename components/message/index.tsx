import { MYSELF } from '@common/constants';
import { UserMessage } from '@common/types';

const Message = ({
  message,
  isLast,
}: {
  message: UserMessage;
  isLast: boolean;
}) => {
  const isMe = message.user === MYSELF;

  return (
    <div className="font-mono text-xs">
      {!message.shouldAggregate && (
        <div className={`w-fit mt-5 mr-6 ${isMe ? 'ml-auto' : ''}`}>
          <span className="font-bold mr-2">{message.user}</span>
          <span className="text-slate-400">{message.time}</span>
        </div>
      )}
      <div
        className={`w-fit mt-1 mr-6 p-3 rounded-xl ${
          isMe ? 'ml-auto bg-emerald-600' : 'bg-gray-600'
        } ${isLast ? (isMe ? 'rounded-br-none' : 'rounded-bl-none') : ''}`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default Message;

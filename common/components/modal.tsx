import { XIcon } from '@heroicons/react/outline';

export default function Modal({ title, modal, onClose, children }: ModalProps) {
  return (
    <div
      className={`${
        modal === 'hidden'
          ? 'hidden'
          : modal === 'close'
          ? 'animate-on-close-chat'
          : 'animate-on-open-chat'
      } h-screen w-screen max-w-full sm:max-w-md`}
      onAnimationEnd={() => modal === 'close' && onClose()}
    >
      <div className="h-full bg-[#1e262e] text-gray-300 shadow-xl rounded-l-3xl">
        <div className="flex flex-col pl-6 py-6 h-full justify-between">
          <div className="flex justify-between mr-6 mb-3">
            <h2 className="text-lg font-medium text-gray-300">{title}</h2>
            <button
              className="text-gray-300 hover:text-white focus:outline-none"
              onClick={onClose}
            >
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

type ModalProps = {
  title: string;
  modal: 'hidden' | 'close' | 'chat' | 'status';
  onClose: () => void;
  children: React.ReactNode;
};

import { useContext } from 'react';
import { UsersStateContext } from 'contexts/users-settings';
import { useUser } from '@auth0/nextjs-auth0';

const Status = ({ muted, visible }: { muted: boolean; visible: boolean }) => {
  const { picture: avatar } = useUser().user!;
  const { streams, avatars, isMuted, isHidden, names } =
    useContext(UsersStateContext);
  const usersEntries = Object.entries(streams);

  return (
    <div className="overflow-y-auto h-[calc(100vh-8rem)]">
      <div className="flex gap-2 items-center pr-4 mb-4">
        <img className="rounded-full w-8 h-8" src={avatar!} alt="User image" />
        <span className="grow">Me</span>
        <div>
          {muted ? (
            <Icon children={icon['muted']} />
          ) : (
            <Icon children={icon['not-muted']} />
          )}
        </div>
        <div>
          {!visible ? (
            <Icon children={icon['not-visible']} />
          ) : (
            <Icon children={icon['visible']} />
          )}
        </div>
      </div>
      {usersEntries.map(([id]) => (
        <div className="flex gap-2 items-center pr-4">
          <img
            className="rounded-full w-8 h-8"
            src={avatars[id]}
            alt="User image"
          />
          <span className="grow">{names[id]}</span>
          <div>
            {isMuted[id] ? (
              <Icon children={icon['muted']} />
            ) : (
              <Icon children={icon['not-muted']} />
            )}
          </div>
          <div>
            {isHidden[id] ? (
              <Icon children={icon['not-visible']} />
            ) : (
              <Icon children={icon['visible']} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Status;

const icon = {
  'not-muted': (
    <>
      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
      <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
    </>
  ),
  muted: (
    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
  ),
  visible: (
    <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
  ),
  'not-visible': (
    <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.5 17.69c0 .471-.202.86-.504 1.124l-4.746-4.746V7.939l2.69-2.689c.944-.945 2.56-.276 2.56 1.06v11.38zM15.75 7.5v5.068L7.682 4.5h5.068a3 3 0 013 3zM1.5 7.5c0-.782.3-1.494.79-2.028l12.846 12.846A2.995 2.995 0 0112.75 19.5H4.5a3 3 0 01-3-3v-9z" />
  ),
};

const Icon = ({ w = 5, h = 5, children }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-${w} h-${h}`}
  >
    {children}
  </svg>
);

import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { UserIcon } from '../../assets/icons';

const Header = () => {
  const userMetadata = useUser();

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {!userMetadata.user ? (
                  <Link href="/api/auth/login">
                    <button className="text-white">Login with Google</button>
                  </Link>
                ) : (
                  <Link href="/api/auth/logout">
                    <button className="text-white">Logout</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <button
                type="button"
                className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                {userMetadata.user?.picture ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={userMetadata.user.picture}
                    alt=""
                  />
                ) : (
                  <UserIcon className="h-10 w-10" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>{' '}
    </nav>
  );
};

export default Header;

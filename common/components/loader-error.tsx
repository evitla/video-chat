import React from 'react';

export default function LoaderError({ msg }: { msg: string }) {
  return (
    <div className="grid place-items-center h-screen text-white">{msg}</div>
  );
}

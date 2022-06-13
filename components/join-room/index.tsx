const JoinRoom = ({ setValue }: any) => {
  return (
    <div className="rounded border border-gray-300 rounded-md mr-3 px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
      <label htmlFor="name" className="block text-xs font-medium text-gray-900">
        Enter a link
      </label>
      <input
        type="text"
        name="name"
        onChange={(e: any) => setValue(e.target.value)}
        id="name"
        className="block w-full p-0 text-gray-900 placeholder-gray-500 sm:text-sm"
      />
    </div>
  );
};

export default JoinRoom;

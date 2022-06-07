import tw from 'tailwind-styled-components';

export const Button = tw.button`
  inline-flex 
  items-center 
  px-4 
  py-2 
  border 
  border-transparent 
  shadow-sm 
  text-sm 
  font-medium 
  rounded-md 
  text-white 
  bg-indigo-600 
  hover:bg-indigo-700 
  focus:outline-none 
  focus:ring-2 
  focus:ring-offset-2 
  focus:ring-indigo-500
  rounded-md 
  mr-3
`;

export const JoinButton = tw.button`
  inline-flex 
  items-center 
  px-2.5 
  py-1.5 
  text-xs 
  font-medium 
  rounded 
  text-gray-700 
  bg-white 
  hover:bg-gray-50 
  focus:outline-none 
  focus:ring-2 
  focus:ring-offset-2 
  focus:ring-indigo-500
`;

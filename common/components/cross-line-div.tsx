const CrossLineDiv = ({ pos = { top: '6', left: '1/2' } }) => (
  <div
    style={{ top: '24px' }}
    className={'bg-current absolute w-2/3 h-0.5 -translate-x-1/2 -rotate-45 '.concat(
      Object.entries(pos)
        .map(([pos, val]) => `${pos}-${val}`)
        .join(' ')
    )}
  />
);

export default CrossLineDiv;

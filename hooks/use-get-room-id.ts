import { useRouter } from 'next/router';

const useGetRoomId = () => {
  const router = useRouter();
  const { qoraId: roomId } = router.query as { qoraId: string };
  return roomId;
};

export default useGetRoomId;

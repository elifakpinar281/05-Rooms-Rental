import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {API_URL} from '../../../config';
import {Room} from '../../../types';
import RoomHeroImage from '../../../components/RoomHeroImage';
import RoomDetails from '../../../components/RoomDetails';
 
export const dynamic = 'force-dynamic';
type Props = {
  params: Promise<{roomId: string}>;
};
 

async function fetchRoom(roomId: string): Promise<Room | null> {
  const response = await fetch(`${API_URL}/rooms/${roomId}`, {cache: 'no-store'});
  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Room could not be loaded');
  }
  return response.json() as Promise<Room>;
}

async function fetchUser() {
  const res = await fetch(`${API_URL}/users/me`, {
    cache: 'no-store'
  });

  if (res.status === 401) {
    return null;
  }

  if (!res.ok) {
    throw new Error('User could not be loaded');
  }

  return res.json();
}
 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { roomId } = await params;
  const room = await fetchRoom(roomId);

  return {title: room ? `${room.title} | Arrrbnb` : 'Room | Arrrbnb'};
}
 
export default async function RoomDetailPage({params}: Props) {
  const {roomId} = await params;
  const [room, user] = await Promise.all([fetchRoom(roomId), fetchUser()]);
 
  if (!room) {
    notFound();
  }

  const roomWithStarred = {
    ...room,
    isStarred: user?.starredRoomIds?.includes(room.id) ?? false
  };
 
  return (
    <div className="flex gap-8 ml-70 mr-70 items-stretch">
      <div className="flex-1">
       <RoomHeroImage url={room.heroUrl} title={room.title} />
      </div>
      <div className="flex-1">
        <RoomDetails room={roomWithStarred} />
      </div>
    </div>
  );
}
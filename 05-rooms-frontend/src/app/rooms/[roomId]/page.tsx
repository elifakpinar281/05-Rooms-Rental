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
 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { roomId } = await params;
  const room = await fetchRoom(roomId);

  return {title: room ? `${room.title} | Arrrbnb` : 'Room | Arrrbnb'};
}
 
export default async function RoomDetailPage({params}: Props) {
  const {roomId} = await params;
  const room = await fetchRoom(roomId);
 
  if (!room) {
    notFound();
  }
 
  return (
    <div className="flex gap-8 ml-70 mr-70 items-stretch">
      <div className="flex-1">
        <RoomHeroImage url={room.heroUrl} title={room.title} />
      </div>
      <div className="flex-1">
        <RoomDetails room={room} />
      </div>
    </div>
  );
}
import {Room} from '../types';
import RoomCard from './RoomCard';
 
export default function RoomGrid({rooms}: {rooms: Room[]}) {
  return (
    <div className="grid grid-cols-1 ml-70 mr-70 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
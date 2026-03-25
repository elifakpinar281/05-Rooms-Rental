import Link from 'next/link';
import Image from 'next/image';
import {Room} from '../types';

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
 
function RoomOwner({owner}: {owner: Room['owner']}) {
  return (
    <div className="flex items-center gap-1.5">
      <Image src={owner.portraitUrl} alt={owner.firstName} height={35} width={35} className="w-5 h-5 rounded-full object-cover"/>
      <span className="text-xs text-gray-500">{owner.firstName}</span>
    </div>
  );
}
 
export default function RoomCard({room}: {room: Room}) {
  return (
    <Link href={`/rooms/${room.id}`}
      className="group block rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2">
      <RoomImage url={room.heroUrl} title={room.title} />
      <div className="p-4 flex flex-col gap-1">
        <h2 className="font-semibold text-gray-900 truncate">{room.title}</h2>
        <p className="text-sm text-gray-500 line-clamp-2">{room.description}</p>
        <p className="text-xs text-gray-400"> Added on {formatDate(room.createdAt)} </p>

        <hr className='text-gray-200'></hr>

        <div className="flex items-center justify-between mt-2">
          <span className="text-cyan-600 font-semibold text-sm">
            ${room.pricePerNight.amount} <span className="text-gray-400 font-normal">/day</span>
          </span>
          <RoomOwner owner={room.owner} />
        </div>
      </div>
    </Link>
  );
}
 
function RoomImage({url, title}: {url: string; title: string}) {
  return (
    <div className="relative h-44 bg-gray-100">
      <Image src={url} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" 
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"/>
    </div>
  );
}
import {Room} from '../types';
import Image from 'next/image'; 
import StarButton from './StarButton'

type RoomWithStarred = Room & { isStarred: boolean };

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

function formatPrice(amount: number, currency: string) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }

  export default function RoomDetails({room}: {room: RoomWithStarred}) {
    return (
      <div className="flex flex-col justify-between min-h-full">
      <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
          <h1 className="text-4xl font-bold text-gray-900">{room.title}</h1>
          <StarButton roomId={room.id} isStarred={room.isStarred} />
      </div>
        <p className="text-gray-600 leading-relaxed">{room.description}</p>
        <p className="text-sm text-gray-400">
          Added on {formatDate(room.createdAt)}
        </p>
        <RoomOwner owner={room.owner} />
      </div>
      <RoomPrice amount={room.pricePerNight.amount} currency={room.pricePerNight.currency}/>
    </div>
    );
  }
   
  function RoomOwner({owner}: {owner: Room['owner']}) {
    return (
      <div className="flex items-center mt-10 gap-2">
        <Image src={owner.portraitUrl} alt={owner.firstName} width={35} height={35} className="w-7 h-7 rounded-full object-cover"/>
        <span className="text-base text-gray-600">
          {owner.firstName} {owner.lastName}
        </span>
      </div>
    );
  }
   
  function RoomPrice({amount, currency}: {amount: number; currency: string}) {
    return (
      <div className="text-right">
        <div className='flex items-end justify-end gap-1'>
          <p className="text-3xl font-bold text-cyan-600">
            {formatPrice(amount, currency)}
          </p>
          <p className="text-sm text-gray-400">/day</p>
        </div>
      </div>
    );
  }
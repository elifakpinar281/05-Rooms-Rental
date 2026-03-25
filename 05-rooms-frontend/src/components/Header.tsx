import {User} from '../types';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from './Navigation';

type Me = User & { starredRoomIds: number[] };

type Props = {
    user: Me | null;
  };
  
export default function Header({user}: Props) {
    return (
        <header className="flex justify-between items-center h-22 mb-10 bg-slate-100">
        <div className="flex items-center gap-20 ml-70">
        <h1 className="text-2xl font-bold">
            <Link href="/rooms" scroll={true} className="hover:opacity-80 transition-opacity">
                Arrrbnb
            </Link>
        </h1>
            <Navigation />
        </div>
        {user ? <UserAvatar user={user} /> : null}
        </header>
    );
}
   
function UserAvatar({user}: Props) {
    return (
        <div className="flex mr-70 items-center">
            <Image src={user.portraitUrl} alt={`${user.firstName} ${user.lastName}`} height={35} width={35} aria-label="Avatar of the user" className="rounded-full object-cover"/>
            <div className="flex flex-col items-end leading-tight text-right">
                <span className="text-m font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                </span>
                <span className="text-sm text-gray-600 font-medium tabular-nums">
                    <span className="inline-block w-6 text-right">{user.starredRoomIds.length}</span> starred rooms
                </span>
            </div>
        </div>
    );
}
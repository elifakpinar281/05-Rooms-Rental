import {User} from '../types';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from './Navigation';

type Props = {
    user: User;
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
        <UserAvatar user={user} />
        </header>
    );
}
   
function UserAvatar({user}: Props) {
    return (
        <div className="flex mr-70 items-center gap-3">
        <Image src={user.portraitUrl} alt={`${user.firstName} ${user.lastName}`} height={35} width={35} aria-label="Avatar of the user" className="w-8 h-8 rounded-full object-cover"/>
        <span className="text-m font-semibold text-gray-900">
            {user.firstName} {user.lastName}
        </span>
        </div>
    );
}
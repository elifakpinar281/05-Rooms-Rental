import {Metadata} from 'next';
import {User} from '../types';
import {API_URL} from '../config';
import {ReactNode} from 'react'
import './globals.css';
import Header from '../components/Header'

export const metadata: Metadata = {
  title: 'Room rentals',
  description: 'A page with room rentals.'
};

type Me = User & { starredRoomIds: number[] };

async function fetchCurrentUser() {
  const response = await fetch(API_URL + '/users/me', {cache: 'no-store'});
  if (response.status === 401) {
    return null;
  }
  
  if (!response.ok) {
    throw new Error('User could not be loaded');
  }

  return response.json() as Promise<Me | null>;
}

export default async function RootLayout({children}: {children: ReactNode}) {
  const user = await fetchCurrentUser();
  return (
    <html lang="en">
      <body className='min-h-screen overflow-y-scroll'>
        <div className="bg-white min-h-[70px]">
          <Header user={user}/>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
import {Metadata} from 'next';
import {API_URL} from '../../config';
import {Collection, Room} from '../../types';
import { SortValue } from '../../components/SortValue';
import RoomGrid from '../../components/RoomGrid';
import Pagination from '../../components/Pagination';
import PageInfo from '../../components/PageInfo';
import SortSelect from '../../components/SortSelect';

export const dynamic = 'force-dynamic'; 
export const metadata: Metadata = {
  title: 'Rooms - Arrrbnb',
  description: 'A list of rooms from Arrrbmb.'
};

type Props = {
  searchParams: Promise<{page?: string; sort?: string}>;
};
 
async function fetchRooms(page: number, sort: SortValue) {
  const response = await fetch(`${API_URL}/rooms?page=${page}&size=9&sort=${sort}`, {cache: 'no-store'});

  if (!response.ok) {
    throw new Error('Could not load rooms.')
  }
  return response.json() as Promise<Collection<Room>>;
}

 
export default async function RoomsPage({searchParams}: Props) {
  const params = await searchParams;
  const userPage = Math.max(1, Number(params.page) || 1);
  const apiPage = userPage - 1;
  const sort: SortValue = params.sort === 'pricePerNight' ? 'pricePerNight' : 'createdAt';
  const data = await fetchRooms(apiPage, sort);
 
  function buildPageLink(page: number) {
    return `/rooms?page=${page}&sort=${sort}`;
  }
 
  return (
    <div>
      <div className="flex items-center justify-between mb-6 ml-70">
        <PageInfo page={data.page} currentPage={userPage} />
        <SortSelect currentSort={sort} />
      </div>
      <RoomGrid rooms={data.nodes} />
      <Pagination page={data.page} currentPage={userPage} buildLink={buildPageLink}/>
    </div>
  );
}
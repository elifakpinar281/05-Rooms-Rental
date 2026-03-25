import {Metadata} from 'next';
import CreateRoomForm from '../../components/CreateRoomForm';
 
export const metadata: Metadata = {
  title: 'Create a Room - Arrrbnb'
};
 
export default function CreatePage() {
  return (
    <div className="max-w-xl ml-70">
      <h2 className="text-3xl font-bold mb-9">Add cabin</h2>
      <CreateRoomForm />
    </div>
  );
}
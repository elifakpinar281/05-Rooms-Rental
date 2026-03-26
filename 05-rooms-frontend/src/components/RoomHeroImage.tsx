import Image from 'next/image';

export default function RoomHeroImage({url, title}: {url: string; title: string}) {
    return (
      <div className="w-full rounded-sm overflow-hidden bg-gray-100">
        <Image src={url} alt={title} className="object-cover" width={520} height={360} priority/>
      </div>
    );
  }
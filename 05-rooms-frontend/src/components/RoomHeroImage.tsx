import Image from 'next/image';

export default function RoomHeroImage({url, title}: {url: string; title: string}) {
    return (
      <div className="relative w-130 h-90 shrink-0 rounded-sm overflow-hidden bg-gray-100">
        <Image src={url} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority/>
      </div>
    );
  }
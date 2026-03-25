'use client';
import Link from 'next/link';
import {useSelectedLayoutSegment} from 'next/navigation';
 
export default function Navigation() {
  const segment = useSelectedLayoutSegment();
 
  const links = [
    {href: '/rooms', label: 'Cabins', segment: 'rooms'},
    {href: '/create', label: 'Add cabin', segment: 'create'}
  ];
 
  return (
    <nav className="flex items-center gap-2">
      {links.map((link) => {
        const isActive = segment?.startsWith(link.segment);
        return (
          <Link key={link.href} href={link.href} scroll={true} aria-current={isActive ? "page" : undefined}
          className={"px-3 py-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-1 " +
          (isActive ? "bg-gray-300 text-black" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100")}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
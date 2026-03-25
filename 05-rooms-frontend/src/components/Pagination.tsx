import Link from 'next/link';
import {PageInfo as PageInfoType} from '../types';
import PageInfo from './PageInfo';

type Props = {
  page: PageInfoType;
  currentPage: number;
  buildLink: (page: number) => string;
};
 
export default function Pagination({ page, currentPage, buildLink }: Props) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < page.totalPages;
 
  return (
    <div className="flex mb-20 items-center justify-center gap-4 mt-10">
      <PageButton href={buildLink(currentPage - 1)} label="← " active={hasPrev} />
      <PageInfo page={page} currentPage={currentPage} />
      <PageButton href={buildLink(currentPage + 1)} label=" → " active={hasNext}/>
    </div>
  );
}
 
function PageButton({ href, label, active }: { href: string; label: string; active: boolean }) {
  if (active) {
    return (
      <Link href={href} scroll={true} className="text-xl text-gray-500 transition-all hover:text-cyan-800 hover:font-bold hover:scale-105">
        {label}
      </Link>
    );
  } else {
    return (
      <span className="text-lg text-gray-300 cursor-not-allowed">
        {label}
      </span>
    );
  }
}
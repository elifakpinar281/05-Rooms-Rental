import {PageInfo as PageInfoType} from '../types';
 
type Props = {
  page: PageInfoType;
  currentPage: number;
};
 
export default function PageInfo({page, currentPage}: Props) {
  return (
    <p className="text-sm text-gray-500">
      Page {currentPage} of {page.totalPages} ({page.totalElements} results in total)
    </p>
  );
}
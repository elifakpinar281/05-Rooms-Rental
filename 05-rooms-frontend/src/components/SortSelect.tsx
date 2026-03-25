'use client';
import { Select } from '@base-ui/react/select';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { SortValue } from './SortValue';
 
export default function SortSelect({currentSort}: {currentSort: SortValue}) {
  const router = useRouter();
  const searchParams = useSearchParams();
 
  function handleChange(value: string) {
    const sort = value as SortValue;
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    params.delete('page');
    router.push(`/rooms?${params.toString()}`);
  }

  return (
    <Select.Root value={currentSort} onValueChange={handleChange}>
      <Select.Trigger className="flex items-center mr-70 gap-2 px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 cursor-pointer" aria-label="Sorting">
        <Select.Value placeholder="Sorting...">
          {currentSort === 'createdAt' ? 'Newest' : 'Price'}
        </Select.Value>
        <Select.Icon className="text-gray-400 text-xs">▼</Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup className="bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[160px]">
            <Select.Item value="createdAt" className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-200 focus:bg-gray-200 focus:outline-none data-[highlighted]:bg-gray-100">
              <Select.ItemText>Newest first</Select.ItemText>
            </Select.Item>
            <Select.Item value="pricePerNight" className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-200 focus:bg-gray-200 focus:outline-none data-[highlighted]:bg-gray-100">
              <Select.ItemText>Price ascending</Select.ItemText>
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
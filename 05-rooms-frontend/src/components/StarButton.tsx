'use client';

import {useState, useTransition} from 'react';
import {toggleStarred} from '../app/rooms/actions';

export default function StarButton({roomId, isStarred: initialStarred}: {roomId: number; isStarred: boolean}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isStarred, setIsStarred] = useState<boolean>(initialStarred);

  return (
    <div className="flex flex-col items-end">
      <button type="button" aria-label={isStarred ? 'Unstar room' : 'Star room'} aria-pressed={isStarred} disabled={isPending}
        className={`text-3xl leading-none transition-transform transition-colors select-none focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 rounded-sm transition-opacity ${isPending ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
        onClick={() => {setError(null);
          startTransition(async () => {
            const result = await toggleStarred(roomId);
            if (!result.ok) {
                setError(result.error);
            } else {
              setIsStarred(prev => !prev);
            }
        });
        }}>
        {isStarred ? '★' : '☆'}
      </button>
      {error ? <p className="text-xs text-red-600 mt-1 max-w-[220px] text-right">{error}</p> : null}
    </div>
  );
}
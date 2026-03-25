'use server';

import {API_URL} from '../../config';
import {revalidatePath} from 'next/cache';

export async function toggleStarred(roomId: number) {
  const res = await fetch(`${API_URL}/rooms/${roomId}/toggle-starred`, {method: 'POST'});
  if (!res.ok) {
    const text = await res.text();
    return {ok: false as const, error: text || 'Could not toggle starred.'};
  }
  revalidatePath('/');
  return {ok: true as const};
}
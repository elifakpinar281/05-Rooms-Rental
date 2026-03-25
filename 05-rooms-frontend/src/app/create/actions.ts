'use server';

import {redirect} from 'next/navigation';
import {API_URL} from '../../config';

type FormState = {error: string; 
  values?: {title: string; description: string; heroUrl: string; priceAmount: string};
};

export async function createRoom(prevState: FormState, formData: FormData): Promise<FormState> {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const heroUrl = formData.get('heroUrl') as string;
  const priceAmount = formData.get('priceAmount') as string;

  const values = {title, description, heroUrl, priceAmount};

  const response = await fetch(`${API_URL}/rooms`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      title,
      description,
      heroUrl,
      pricePerNight: {
        amount: parseFloat(priceAmount),
        currency: 'USD'
      }
    })
  });

  if (!response.ok) {
    const text = await response.text();
      try {
      const json = JSON.parse(text);
      if (Array.isArray(json) && json[0]?.message) {
        return {error: json[0].message, values};
      }
    } catch {}
    return {error: text || 'Could not create room.', values};
  }

  redirect('/rooms');
}
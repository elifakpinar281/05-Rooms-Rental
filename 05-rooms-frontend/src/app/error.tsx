'use client';

import { useEffect } from 'react'
 
export default function ErrorPage({error, unstable_retry, }: {
  error: Error & { digest?: string }
  unstable_retry: () => void }) {
  useEffect(() => { console.error(error) }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Something went wrong!</h2>
      <p className="text-gray-500">{error.message}</p>
      <button onClick={() => unstable_retry()} 
      className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
        Try again
      </button>
    </div>
  )
}
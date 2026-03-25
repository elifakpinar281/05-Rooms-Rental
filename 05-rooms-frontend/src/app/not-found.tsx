import Link from 'next/link';
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <h2 className="text-6xl font-bold text-cyan-800">404</h2>
      <p className="text-xl font-medium text-gray-700">Page not found</p>
      <p className="text-gray-500 text-sm">
        Sorry, this page does not exist.
      </p>
      <Link href="/rooms"
      className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2">
        Back to the rooms
      </Link>
    </div>
  );
}
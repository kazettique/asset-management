'use client';

import FileReader from '@/components/BasicFileReader';

export default function Home() {
  const handleChange = (event: any) => {
    console.log('event', event);
  };

  return (
    <main>
      <h1 className="text-4xl font-bold text-center py-4">Home page</h1>

      <FileReader onChange={handleChange} />
    </main>
  );
}

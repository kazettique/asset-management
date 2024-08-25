import Link from 'next/link';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <nav className="w-auto flex flex-col bg-slate-300 top-0 p-2 sticky items-center gap-x-4">
        <Link href="/setting">Setting</Link>
        <Link href="/setting/brand">Brand</Link>
        <Link href="/setting/category">Category</Link>
        <Link href="/setting/currency">Currency</Link>
        <Link href="/setting/method">Method</Link>
        <Link href="/setting/owner">Owner</Link>
        <Link href="/setting/place">Place</Link>
      </nav>

      <div>{children}</div>
    </section>
  );
}

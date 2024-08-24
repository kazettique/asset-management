import Image from 'next/image';

import { db } from '@/lib/db';

export default async function Page() {
  const categoryList = await db.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <div>
      <div className="font-bold capitalize">category setting page</div>
      <table className="table-auto border-collapse border border-slate-300">
        <thead>
          <tr>
            <th className="border border-slate-300">Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((item, _index) => (
            <tr key={item.id}>
              <td className="border border-slate-300">{item.id}</td>
              <td className="border border-slate-300">{JSON.stringify(item.name)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

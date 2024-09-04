'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import BasicButton from '@/components/BasicButton';
import BasicFileReaderComp from '@/components/BasicFileReader';
import Table, { ColumnProps } from '@/components/Table';
import { PlatformFetcher } from '@/fetcher';
import { PlatformTransformer } from '@/transformer';
import { FPlatform, Id, NType, VPlatform, VPlatformTable } from '@/types';

import Create from './Create';
import Item from './Item';

export default function Page() {
  const [editItem, setEditItem] = useState<NType<VPlatform>>(null);

  const { data, isPending, refetch } = useQuery({
    queryFn: () => PlatformFetcher.FindAll(),
    queryKey: ['platformList'],
  });

  const createPlatform = useMutation({
    mutationFn: (payload: FPlatform) => PlatformFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updatePlatform = useMutation({
    mutationFn: ({ payload, id }: { id: VPlatform['id']; payload: FPlatform }) => PlatformFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
      setEditItem(null);
    },
  });

  const deletePlatform = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return PlatformFetcher.Delete(id);
      } else {
        throw Error('Deletion terminated.');
      }
    },
    onError: (error) => {
      alert(error.message);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const onItemEdit = (platform: VPlatform): void => {
    setEditItem(platform);
  };

  const onItemUpdate = (platform: FPlatform, id: VPlatform['id']): void => {
    updatePlatform.mutate({ id, payload: platform });
  };

  const onItemCancel = (): void => {
    setEditItem(null);
  };

  const onItemDelete = (id: VPlatform['id']): void => {
    deletePlatform.mutate(id);
  };

  const onCreateSubmit = (data: FPlatform) => {
    createPlatform.mutate(data);
  };

  const tableData: VPlatformTable[] = data
    ? data.data.map((item) => PlatformTransformer.VTPlatformTransformer(item))
    : [];
  const columns: ColumnProps<VPlatformTable>[] = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'comment',
      title: 'Comment',
    },
    {
      key: 'action',
      render: (column, item) => (
        <BasicButton
          variant="secondary"
          className="bg-slate-500 p-1 rounded-sm text-white"
          onClick={() => onItemEdit(item.raw)}
        >
          Edit
        </BasicButton>
      ),
      title: 'Action',
    },
  ];

  const handleChange = async (event: any) => {
    // console.log('event', event);
    const res = await PlatformFetcher.CreateMany(event);
    refetch();
  };

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="font-bold capitalize text-xl my-2">platform setting</div>
        <BasicFileReaderComp onChange={handleChange} />
      </div>
      {isPending ? <div>loading...</div> : <Table data={tableData} columns={columns} />}

      <Create onSubmit={onCreateSubmit} className="w-1/2" />
    </div>
  );
}

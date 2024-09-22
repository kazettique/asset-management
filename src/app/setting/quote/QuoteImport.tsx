'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactElement, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import BasicButton from '@/components/BasicButton';
import BasicDrawer from '@/components/BasicDrawer';
import BasicFileReader from '@/components/BasicFileReader';
import BasicIcon from '@/components/BasicIcon';
import Table, { ColumnProps } from '@/components/Table';
import { QuoteConstant } from '@/constant';
import { QuoteMachineContext } from '@/machines';
import { FQuoteImport, IconType, ImportTable, ImportTaskStatus, PQuote } from '@/types';
import { Utils } from '@/utils';
import { QuoteValidator } from '@/validator';

export interface Props {
  children?: ReactElement;
  className?: string;
  importContext: QuoteMachineContext['import'];
  isOpen: boolean;
  onClose: () => void;
  onDone: () => void;
  onImport: (payload: PQuote[]) => void;
  state: 'PREPARE' | 'PROCESSING' | 'FINISH';
}

export default function QuoteImport(props: Props) {
  const { className = '', isOpen, onClose, onDone, onImport, state, importContext } = props;
  const [importItems, setImportItems] = useState<PQuote[]>([]);

  const { handleSubmit, control, setValue, formState } = useForm<FQuoteImport>({
    defaultValues: QuoteConstant.F_QUOTE_IMPORT_INITIAL_VALUES,
    resolver: zodResolver(QuoteValidator.FQuoteImportValidator),
  });

  const isLegalFileData = useWatch({ control, name: 'isLegalFileData' });

  const handleFileData = async (event: any) => {
    const parsedData = Utils.DeepParseJson(event) as any[];
    const csvValidation = QuoteValidator.PQuoteValidator.array().safeParse(parsedData);

    if (!csvValidation.success) {
      setValue('isLegalFileData', false);
    } else {
      setValue('isLegalFileData', true);
      setImportItems(csvValidation.data);
    }
  };

  const tableData: ImportTable[] = Object.values(importContext.tasks).map((item) => ({
    name: item.name,
    status: item.status,
  }));

  const columns: ColumnProps<ImportTable>[] = [
    { key: 'name', title: 'Name' },
    {
      key: 'status',
      render: (column, item) => {
        let statusIcon: IconType;
        switch (item.status) {
          case ImportTaskStatus.FAILED:
            statusIcon = 'circle-xmark-solid';
            break;
          case ImportTaskStatus.PROCESSING:
            statusIcon = 'spinner-solid';
            break;
          case ImportTaskStatus.QUEUE:
            statusIcon = 'circle-pause-solid';
            break;
          case ImportTaskStatus.DONE:
          default:
            statusIcon = 'circle-check-solid';
        }

        return (
          <div
            data-status={item.status}
            className='data-[status="DONE"]:text-green-500 data-[status="FAILED"]:text-red-500 data-[status="PROCESSING"]:text-blue-500 data-[status="PROCESSING"]:animate-spin w-fit h-fit'
          >
            <BasicIcon iconType={statusIcon} />
          </div>
        );
      },
      title: 'Status',
    },
  ];

  return (
    <BasicDrawer isOpen={isOpen} onClose={onClose} disableClose={state === 'PROCESSING'} title="import Quotes">
      <div data-test-comp={QuoteImport.name} className={`p-4 dark:text-white ${className}`}>
        {state === 'PREPARE' ? (
          <form {...props} className="flex flex-col gap-y-4" onSubmit={handleSubmit(() => void onImport(importItems))}>
            <div>
              <BasicFileReader onChange={handleFileData} label="import" />
              {isLegalFileData !== null && (
                <div className="text-sm text-gray-700 dark:text-white font-semibold">
                  <span>File checker: file data is&nbsp;</span>
                  <span
                    data-is-legal={isLegalFileData}
                    className="data-[is-legal='true']:text-green-500 data-[is-legal='false']:text-red-500"
                  >
                    {isLegalFileData ? 'legal' : 'illegal'}
                  </span>
                </div>
              )}
            </div>

            <BasicButton type="submit">Import</BasicButton>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <Table data={tableData} columns={columns} />
            {state === 'FINISH' && <BasicButton onClick={onDone}>Done</BasicButton>}
          </div>
        )}
      </div>
    </BasicDrawer>
  );
}

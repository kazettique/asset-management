'use client';

import { parse } from 'csv-parse/browser/esm';
import csv from 'csvtojson';
import { ChangeEvent, useId, useState } from 'react';

import { NType } from '@/types';

import BasicIcon from './BasicIcon';

export interface Props {
  className?: string;
  label?: string;
  onChange: (event: any) => void;
}

interface FileMeta {
  name: string;
  size: number;
}

// ref: https://code-hl.com/javascript/tutorials/javascript-read-csv
// ref: https://dev.to/ibn_abubakre/styling-file-inputs-like-a-boss-mhm
export default function BasicFileReaderComp(props: Props) {
  const { className = '', onChange, label = 'select file' } = props;

  const [fileMeta, setFileMeta] = useState<NType<FileMeta>>(null);

  const id = useId();
  const compId: string = BasicFileReaderComp.name + id;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files !== null ? files[0] : null;

    if (file !== null) {
      // Get the file name and size
      const { name, size } = file;
      // Convert size in bytes to kilo bytes
      const fileSize = (size / 1000).toFixed(2);

      setFileMeta({ name, size: Number(fileSize) });

      const reader = new FileReader();

      reader.onload = function (e) {
        const csvData = e.target?.result;

        csv({
          noheader: false,
          output: 'json',
        })
          .fromString(String(csvData))
          .then((csvRow) => {
            // console.log(csvRow); // => [["1","2","3"], ["4","5","6"], ["7","8","9"]]
            onChange(csvRow);
          });

        // const parsedData = parse(String(csvData), { columns: true }, function (err, records) {});
        // console.log('parsedData', parsedData);
      };

      reader.readAsText(file);
    }
  };

  return (
    <div data-test-comp={BasicFileReaderComp.name}>
      <input
        {...props}
        type="file"
        id={compId}
        className="opacity-0 w-0 h-0 absolute"
        data-test-comp={BasicFileReaderComp.name}
        onChange={handleChange}
      />
      <label
        htmlFor={compId}
        className="cursor-pointer capitalize w-fit flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
      >
        <BasicIcon iconType="file-import-solid" />
        {label}
      </label>
      {fileMeta && (
        <p className="text-sm text-gray-700">
          <span>{fileMeta.name}</span>
          <span>&nbsp;-&nbsp;</span>
          <span>{fileMeta.size}</span>
          <span>KB</span>
        </p>
      )}
    </div>
  );
}

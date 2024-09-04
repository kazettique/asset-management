import { parse } from 'csv-parse/browser/esm/sync';
import { ChangeEvent, useId } from 'react';

import BasicIcon from './BasicIcon';

export interface Props {
  className?: string;
  label?: string;
  onChange: (event: any) => void;
}

// ref: https://code-hl.com/javascript/tutorials/javascript-read-csv
// ref: https://dev.to/ibn_abubakre/styling-file-inputs-like-a-boss-mhm
export default function BasicFileReaderComp(props: Props) {
  const { className = '', onChange, label = 'Upload' } = props;

  const id = useId();
  const compId: string = BasicFileReaderComp.name + id;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files !== null ? files[0] : null;

    if (file !== null) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const csvData = e.target?.result;

        const parsedData = parse(String(csvData));
        onChange(parsedData);
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
        className="cursor-pointer capitalize w-fit flex items-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
      >
        <BasicIcon iconType="file-import-solid" />
        {label}
      </label>
    </div>
  );
}

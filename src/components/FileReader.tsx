import { parse } from 'csv-parse/browser/esm/sync';
import { ChangeEvent } from 'react';
export interface Props {
  className?: string;
}

export default function FileReaderComp(props: Props) {
  const { className = '' } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log('event', event);
    const fileDirectory = event.target.value;
    // console.log('fileDirectory', fileDirectory);

    event.preventDefault();
    const reader = new FileReader();
    reader.onload = async (_event) => {
      // console.log('_event', _event.target);
      const text = _event.target?.result;
      console.log('text', text);
      // alert(text);
      // if (typeof text === 'string') {
      //   const test = parse(text);
      //   console.log('test', test);
      // }
    };
    // reader.readAsText(event.target.files[0]);
  };

  return (
    <input
      {...props}
      type="file"
      className={`${className}`}
      data-test-comp={FileReaderComp.name}
      onChange={handleChange}
    />
  );
}

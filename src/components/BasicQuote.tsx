export interface Props {
  author: string;
  className?: string;
  quote: string;
}

export default function Component(props: Props) {
  const { className = '', author, quote } = props;

  return (
    <div className={`w-full bg-gray-50 px-5 pt-5 pb-10 text-gray-800 ${className}`} data-test-comp={Component.name}>
      <div className="w-full mb-10">
        <div className="text-3xl text-indigo-500 text-left leading-tight h-3">“</div>
        <p className="text-sm text-gray-600 text-center px-5">{quote}</p>
        <div className="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3">”</div>
      </div>
      <div className="w-full">
        <p className="text-md text-indigo-500 font-bold text-center">{author}</p>
      </div>
    </div>
  );
}

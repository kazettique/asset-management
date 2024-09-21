export interface Props {
  className?: string;
  title: string;
  value: string;
}

export default function GeneralItem(props: Props) {
  return (
    <div className={`className`} data-test-comp={GeneralItem.name}>
      <div className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{props.value}</div>
      <div className="text-base font-normal text-gray-500 capitalize">{props.title}</div>
    </div>
  );
}

export interface Props {
  className?: string;
  isChecked: boolean;
  label?: string;
  onChange: (isChecked: boolean) => void;
}

// ref: https://www.cssscript.com/realistic-ios-switch-pure-css/
export default function ToggleSwitch(props: Props) {
  const { className = '', label = '', onChange, isChecked } = props;

  const handleChange = (): void => {
    onChange(!isChecked);
  };

  return (
    <label className={`toggleSwitch ${className}`}>
      <div>{label}</div>
      <input type="checkbox" checked={isChecked} onClick={handleChange} />
      <i />
    </label>
  );
}

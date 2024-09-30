export interface Props {
  checked: boolean;
  className?: string;
  label?: string;
  onChange: (isChecked: boolean) => void;
}

// ref: https://www.cssscript.com/realistic-ios-switch-pure-css/
export default function BasicToggleSwitch(props: Props) {
  const { className = '', label = '', onChange, checked } = props;

  const handleChange = (): void => {
    onChange(!checked);
  };

  return (
    <label className={`toggleSwitch ${className}`} data-test-comp={BasicToggleSwitch.name}>
      <div>{label}</div>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <i />
    </label>
  );
}

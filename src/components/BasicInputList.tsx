import { ReactElement } from 'react';
import { ArrayPath, Control, FieldArray, FieldValues, Path, useFieldArray, UseFormRegister } from 'react-hook-form';

import BasicIcon from './BasicIcon';

export interface Props<Values extends FieldValues> {
  children?: ReactElement;
  className?: string;
  control: Control<Values>;
  label?: string;
  newItemDefaultValue: FieldArray<Values, ArrayPath<Values>>;
  path: ArrayPath<Values>;
  register: UseFormRegister<Values>;
}

export default function Component<Values extends FieldValues>(props: Props<Values>) {
  const { children, className = '', control, path, label, register, newItemDefaultValue } = props;

  const { fields, append, remove } = useFieldArray<Values, ArrayPath<Values>>({
    control,
    name: path,
  });

  return (
    <label
      className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 flex flex-col gap-1"
      htmlFor={path}
      data-test-comp={Component.name}
    >
      {label || path}
      {fields.map((field, index) => {
        const fieldKeys = Object.keys(field);

        return (
          <div className="flex gap-2 items-center" key={field.id}>
            {fieldKeys
              .filter((item) => item !== 'id')
              .map((_item, _index) => (
                <input
                  className={`block grow h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-50 ${className}`}
                  key={_index}
                  {...register(`${path}.${index}.${_item}` as Path<Values>)}
                />
              ))}
            <button className="bg-red-100 hover:bg-red-200 rounded p-1" type="button">
              <BasicIcon className="text-red-500" iconType="xmark-solid" onClick={() => remove(index)} />
            </button>
          </div>
        );
      })}

      <button
        type="button"
        className="bg-slate-100 rounded my-1 hover:bg-slate-200"
        onClick={() => append(newItemDefaultValue)}
      >
        <BasicIcon iconType="cross" className="text-2xl" />
      </button>
    </label>
  );
}

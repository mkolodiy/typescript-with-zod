import { format } from 'date-fns';
import { type ChangeEventHandler, useState } from 'react';

type Props = Omit<JSX.IntrinsicElements['input'], 'type' | 'value'> & {
  value: Date | string;
};

export function DateInput({ value: dateValue, onChange, ...restProps }: Props) {
  const [value, setValue] = useState(
    typeof dateValue === 'string' ? dateValue : format(dateValue, 'yyyy-MM-dd')
  );

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setValue(value);
    onChange?.(e);
  };

  return (
    <input value={value} type="date" onChange={handleOnChange} {...restProps} />
  );
}

import type { KeyboardEventHandler } from 'react';

type Props = Omit<JSX.IntrinsicElements['input'], 'type'>;

export function NumberInput({ onKeyDown, ...restProps }: Props) {
  const handleOnKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.code.startsWith('Key')) {
      e.preventDefault();
    }
    onKeyDown?.(e);
  };

  return <input onKeyDown={handleOnKeyDown} type="number" {...restProps} />;
}

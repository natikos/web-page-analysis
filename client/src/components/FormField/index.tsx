import { ReactElement, useState } from 'react';
import './style.css';

interface IFormFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  validation?: {
    message: string;
    isValid: boolean;
  };
  placeholder?: string;
  type?: 'text' | 'url';
}

export default function FormField(props: IFormFieldProps): ReactElement {
  const {
    name,
    label,
    value,
    onChange,
    validation,
    placeholder = '',
    type = 'text'
  } = props;

  const [isDirty, setIsDirty] = useState(false);

  const turnOnInvalidState = !validation?.isValid && isDirty;

  const getClassNames = (elementTag: string) => {
    const baseClass = `form-field__${elementTag}`;
    return turnOnInvalidState
      ? `${baseClass} ${baseClass}_invalid`
      : baseClass;

  };

  return (
    <div className='form-field'>
      <div className='form-field__wrapper'>
        <label className={getClassNames('label')} htmlFor={name}>
          {label}
        </label>
        <input
          className={getClassNames('input')}
          id={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={({ target }) => {
            if (!isDirty) {
              setIsDirty(true);
            }
            onChange(target.value);
          }}
        />
      </div>
      {turnOnInvalidState && <p className="form-field__message">{validation?.message}</p>}
    </div>
  );
}
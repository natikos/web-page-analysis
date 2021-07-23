import { ReactElement } from 'react';
import './style.css';

interface IFormFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  validation?: {
    message: string;
    isInvalid: boolean;
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

  const getClassNames = (elementTag: string) => {
    const baseClass = `form-field__${elementTag}`;
    return validation?.isInvalid
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
          onChange={({ target }) => onChange(target.value)}
        />
      </div>
      {!!validation?.isInvalid && <p>{validation.message}</p>}
    </div>
  );
}
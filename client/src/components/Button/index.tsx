import './style.css';

interface IButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset',
}

export default function Button(props: IButtonProps) {
  const { onClick, type = 'button', text, disabled } = props;
  
  return <button
    className='button'
    onClick={onClick}
    disabled={disabled}
    type={type}>
    {text}
  </button>;
}
import { FormEventHandler, useState } from 'react';
import Button from 'components/Button';
import FormField from 'components/FormField';
import './style.css';

export default function Form() {
  const [fields, setFields] = useState({
    url: {
      value: '',
      validate: (value: string): boolean => {
        return false;
      }
    }
  });

  const submitUrlForAnalysis: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log('Submit');
  };

  return <form onSubmit={submitUrlForAnalysis}>
    <FormField
      name='url'
      type='url'
      placeholder='https://...'
      label='Web-site url'
      value={fields.url.value}
      onChange={(url) => setFields({ ...fields, url: { ...fields.url, value: url } })}
    />
    <Button type='submit' text='Submit' />
  </form>
}
import { FormEventHandler, useState } from 'react';
import Button from 'components/Button';
import FormField from 'components/FormField';
import './style.css';

export default function Form() {
  const [fields, setFields] = useState({
    url: {
      value: '',
      isValid: false,
    }
  });

  const submitUrlForAnalysis: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log('Submit');
  };

  const onUrlFieldChange = (url: string): void => {
    setFields({
      url: {
        isValid: isValidUrl(url),
        value: url
      }
    });
  };

  const isValidUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return !!urlObj.hostname && !!urlObj.protocol;
    } catch (_) {
      return false;
    }
  };

  return <form onSubmit={submitUrlForAnalysis}>
    <FormField
      name='url'
      type='url'
      placeholder='https://...'
      label='Web-site url'
      value={fields.url.value}
      onChange={onUrlFieldChange}
      validation={{ message: 'Invalid url', isValid: fields.url.isValid }}
    />
    <Button type='submit' text='Submit' disabled={!fields.url.isValid}/>
  </form>
}
import { FormEventHandler, ReactElement, useState } from 'react';
import Button from 'components/Button';
import FormField from 'components/FormField';
import { IScrappedData } from 'common/interfaces';
import './style.css';
import service from 'services/api.service';

interface IFormProps {
  prepareForNewData: () => void;
  newDataArrived: (data: IScrappedData) => void;
  isLoading: boolean;
}

export default function Form({ prepareForNewData, newDataArrived, isLoading }: IFormProps): ReactElement {
  const [fields, setFields] = useState({
    url: {
      value: '',
      isValid: false,
    }
  });

  const submitUrlForAnalysis: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    prepareForNewData();
    service.getScrappedInfo(fields.url.value)
      .then(newDataArrived);
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
    <Button type='submit' text='Submit' disabled={!fields.url.isValid || isLoading} />
  </form>
}
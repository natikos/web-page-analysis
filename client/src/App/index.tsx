import { useState } from 'react';
import Form from 'components/Form';
import Info from 'components/Info';
import { IScrappedData } from 'interfaces';
import './style.css';

interface IAppState {
  data: IScrappedData | null;
  isLoading: boolean;
}

export default function App() {
  const [scrappedData, setScrappedData] = useState<IAppState>({ data: null, isLoading: false });
  const prepareForNewData = () => {
    setScrappedData({ data: null, isLoading: true });
  };
  const newDataArrived = (data: IScrappedData) => {
    console.log('data', data);
    setScrappedData({ data, isLoading: false });
  };
  return <div id='app'>
    <h1>Hey there!</h1>
    <Form prepareForNewData={prepareForNewData} isLoading={scrappedData.isLoading} newDataArrived={newDataArrived}/>
    {(scrappedData.data && !scrappedData.isLoading) && <Info data={scrappedData.data} />}
  </div>;
}


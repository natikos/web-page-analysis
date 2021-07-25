import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Form from 'components/Form';
import Info from 'components/Info';
import { AUTOCLOSE_IN_MILISEC, MAX_NOTIFICATIONS } from 'common/constants';
import { IScrappedData } from 'common/interfaces';

import 'react-toastify/dist/ReactToastify.css';
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
    setScrappedData({ data, isLoading: false });
  };

  return (<>
    <div id='app'>
      <h1>Hey there!</h1>
      <Form prepareForNewData={prepareForNewData} isLoading={scrappedData.isLoading} newDataArrived={newDataArrived} />
      {(scrappedData.data && !scrappedData.isLoading) && <Info data={scrappedData.data} />}
    </div>
    <ToastContainer
      className="notification"
      progressClassName="notification__progressbar"
      bodyClassName="notification__content"
      closeOnClick={true}
      pauseOnHover={true}
      pauseOnFocusLoss={false}
      closeButton={false}
      autoClose={AUTOCLOSE_IN_MILISEC}
      limit={MAX_NOTIFICATIONS}
    />
  </>);
}


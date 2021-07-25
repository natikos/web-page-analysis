import axios from 'axios';
import { toast } from 'react-toastify';
import { IScrappedData } from 'common/interfaces';

const service = {
  getScrappedInfo: async (url: string): Promise<IScrappedData> => {
    const serverURL = process.env.REACT_APP_API_URL;
    const endpoint = serverURL ? `${serverURL}/info` : '';
    const response: IScrappedData = await axios.get(
      endpoint,
      { params: { url } })
      .then(({ data }) => data)
      .catch((error) => {
        toast(
          error.response?.data?.error ?? 'Error! Please, try again later :(',
          { className: 'notification_failure' });
      });

    return response;
  }
};

export default service;
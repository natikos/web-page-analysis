import axios from 'axios';
import { IScrappedData } from 'interfaces';

const service = {
  getScrappedInfo: async (url: string): Promise<IScrappedData> => {
    const serverURL = process.env.REACT_APP_API_URL;
    const endpoint = serverURL ? `${serverURL}/info` : '';
    const response: IScrappedData = await axios.get(
      endpoint,
      { params: { url } })
      .then(({ data }) => data)
      .catch((err) => {
        console.log(err);
      });

    return response;
  }
};

export default service;
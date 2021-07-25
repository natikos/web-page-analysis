const axios = require('axios').default;
const { MILISEC_IN_SEC, REQUEST_TIMEOUT_IN_SEC } = require('./constants');

axios.interceptors.request.use((config) => {
  config.meta = config.meta || {};
  config.meta.startAt = new Date().getTime();
  return config;
});

axios.interceptors.response.use(
  (response) => {
    if (response?.config?.meta) {
      response.config.meta.endAt = new Date().getTime();
    }
    return response;
  },
  (response) => {
    if (response?.config?.meta) {
      response.config.meta.endAt = new Date().getTime();
    }
    throw response;
  }
);


module.exports = {
  get: async (url) => {
    try {
      const response = await axios.get(url, { timeout: REQUEST_TIMEOUT_IN_SEC * MILISEC_IN_SEC });
      const { config, data } = response;
      const loadingTimeInSec = (config.meta.endAt - config.meta.startAt) / MILISEC_IN_SEC;
      return { data, loadingTimeInSec };
    } catch (err) {
      switch (err.code) {
        case 'ENOTFOUND':
          throw ({ status: 404, error: 'Page not found' });
        case 'ECONNREFUSED':
          throw ({ status: 500, error: 'Page is not reachable' });
        case 'ECONNABORTED':
          throw ({ status: 408, error: 'Timeout exceeded' });
        default:
          throw ({ status: 500, error: 'Internal server error' });
      }
    }
  }
};
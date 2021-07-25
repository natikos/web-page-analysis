const axios = require('axios').default;
const { MILISEC_IN_SEC } = require('./constants');

axios.interceptors.request.use((config) => {
  config.meta = config.meta || {};
  config.meta.startAt = new Date().getTime();
  return config;
});

axios.interceptors.response.use(
  (response) => {
    response.config.meta.endAt = new Date().getTime();
    return response;
  },
  (response) => {
    response.config.meta.endAt = new Date().getTime();
    throw response;
  }
);

module.exports = {
  get: async (url) => {
    const { config, data } = await axios.get(url);
    const loadingTimeInSec = (config.meta.endAt - config.meta.startAt) / MILISEC_IN_SEC;
    return { data, loadingTimeInSec };
  }
};
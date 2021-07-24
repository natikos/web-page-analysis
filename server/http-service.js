const axios = require('axios').default;

module.exports = {
  get: async (url) => {
    const { data } = await axios.get(url);
    return data;
  }
};
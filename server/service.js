const httpService = require('./http-service');
const ScrappingManager = require('./scrapping-manager');
const { mapDataToSingleStructure } = require('./utils');

async function getInfoOfWebPage(req, res) {
  const { url } = req.query;
  const { data, loadingTimeInSec } = await httpService.get(url);
  const scrappingManager = new ScrappingManager(url);
  scrappingManager.loadPage(data);
  res.json(mapDataToSingleStructure({ ...result, loadingTimeInSec }));
}

async function validateInputUrl(req, res, next) {
  const { url } = req.query;
  try {
    const urlObj = new URL(url);
    if (!urlObj.hostname || !urlObj.protocol) {
      const errResponse = {
        error: 'Invalid URL is provided',
        value: url
      }
      return res.status(400).json(errResponse);
    }
    return next();
  } catch (e) {
    const errResponse = {
      error: 'url is not provided or it is not an URL',
      value: url
    }
    return res.status(400).json(errResponse);
  }
}


const routeHandler = {
  getInfo: {
    middlewares: [
      validateInputUrl,
    ],
    handler: getInfoOfWebPage
  }
};

module.exports = routeHandler;
const httpService = require('./http-service');
const ScrappingManager = require('./scrapping-manager');

async function getInfoOfWebPage(req, res) {
    const { url } = req.body;
    const { data, loadingTimeInSec } = await httpService.get(url);
    const scrappingManager = new ScrappingManager(url);
    scrappingManager.loadPage(data);
    const result = await scrappingManager.getScrappedData();
    res.json({ ...result, loadingTimeInSec });
}

async function validateInputUrl(req, res, next) {
  try {
    const urlObj = new URL(req.body.url);
    if (!urlObj.hostname || !urlObj.protocol) {
      const errResponse = {
        error: 'Invalid URL is provided',
        value: req.body.url
      }
      return res.status(400).json(errResponse);
    }
    return next();
  } catch (e) {
    const errResponse = {
      error: 'url is not provided or it is not an URL',
      value: req.body.url
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
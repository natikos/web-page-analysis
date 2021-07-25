const httpService = require('./http-service');
const ScrappingManager = require('./scrapping-manager');

async function getInfoOfWebPage(req, res) {
  const { url } = req.body;
  const page = await httpService.get(url);
  const scrappingManager = new ScrappingManager(url);
  scrappingManager.loadPage(page);
  const result = await scrappingManager.getScrappedData();
  res.json(result);
}

const routeHandler = {
  getInfo: getInfoOfWebPage
};

module.exports = routeHandler;
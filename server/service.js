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

const routeHandler = {
  getInfo: getInfoOfWebPage
};

module.exports = routeHandler;
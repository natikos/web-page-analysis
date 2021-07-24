const httpService = require('./http-service');
const ScrappingManager = require('./scrapping-manager');

async function getInfoOfWebPage(req, res) {
  const { url } = req.body;
  const page = await httpService.get(url);
  const scrappingManager = new ScrappingManager();
  scrappingManager.loadPage(page);
  res.json(scrappingManager.getScrappedData());
}

const routeHandler = {
  getInfo: getInfoOfWebPage
};

module.exports = routeHandler;
const cheerio = require('cheerio');
const probe = require('probe-image-size');
const { HTML5, HEADING_TAGS } = require('./constants');

class ScrappingManager {
  #$document = null;

  loadPage(webPage) {
    this.#$document = cheerio.load(webPage);
  }

  async getScrappedData() {
    if (!this.#$document) {
      throw new Error('Document was not loaded');
    }

    const images = await this.#imagesData();

    return {
      htmlVersion: this.#htmlVersion,
      title: this.#title,
      headings: this.#headingsData,
      images
    };
  }

  async #imagesData() {
    const amount = this.#$document('img').length;
    const imagesData = [];

    this.#$document('img').each((_, element) => {
      const img = this.#$document(element);
      const src = img.attr('src');
      imagesData.push(this.#getImageDimensions(src));
    });

    const items = await Promise.all(imagesData);

    return {
      amount,
      largest: this.#detectLargestImage(items)
    };
  }

  #detectLargestImage(items) {
    return items.reduce(function (current, potential) {
      const squareOfPotential = potential.width * potential.height;
      const squareOfCurrent = current.width * current.height;
      return squareOfCurrent > squareOfPotential ? current : potential;
    });
  }

  async #getImageDimensions(url) {
    const { width, height } = await probe(url);
    return { width, height, url };
  }

  get #headingsData() {
    const result = {};
    this.#$document(HEADING_TAGS).each((_, { tagName }) => {
      const currentAmount = result[tagName] ?? 0;
      result[tagName] = currentAmount + 1;
    });
    return result;
  }

  get #title() {
    return this.#$document('head > title').text();
  }

  get #htmlVersion() {
    const startStrOfDoctype = '<!doctype';
    const endStrOfDoctype = '<html';
    const root = this.#$document.root().html();
    const caseInsensitiveDoc = root.toLowerCase();
    const startIndex = caseInsensitiveDoc.indexOf(startStrOfDoctype);
    const endIndex = caseInsensitiveDoc.indexOf(endStrOfDoctype);
    const doctypeStr = root.substring(startIndex, endIndex + 1);
    return this.#determineHtmlVersion(doctypeStr);
  }

  #determineHtmlVersion(doctypeElement) {
    const patternToDetermineOldVersions = /\/\/DTD\s(.*?)\/\//;
    const match = doctypeElement.match(patternToDetermineOldVersions);
    const versionGroup = match?.[1];
    return versionGroup || HTML5;
  }
}

module.exports = ScrappingManager;
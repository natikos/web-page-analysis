const cheerio = require('cheerio');

class ScrappingManager {
  #$document = null;

  loadPage(webPage) {
    this.#$document = cheerio.load(webPage);
  }

  getScrappedData() {
    if (!this.#$document) {
      throw new Error('Document was not loaded');
    }

    return {
      htmlVersion: this.#htmlVersion,
      title: this.#title,
    };
  }

  get #title() {
    return this.#$document('title').text();
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
    return versionGroup || 'HTML 5';
  }
}

module.exports = ScrappingManager;
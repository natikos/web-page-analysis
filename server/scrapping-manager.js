const cheerio = require('cheerio');

class ScrappingManager {
  #$root = null;
  #$body = null;

  loadPage(webPage) {
    const document = cheerio.load(webPage);
    this.#$root = document.root();
    this.#$body = document;
  }

  getScrappedData() {
    if (!this.#$body || !this.#$root) {
      throw new Error('Document was not loaded');
    }

    return {
      htmlVersion: this.#htmlVersion,
      title: this.#title,
    };
  }

  get #title() {
    return this.#$body('title').text();
  }

  get #htmlVersion() {
    const startStrOfDoctype = '<!doctype';
    const endStrOfDoctype = '<html';
    const caseInsensitiveDoc = this.#$root.html().toLowerCase();
    const startIndex = caseInsensitiveDoc.indexOf(startStrOfDoctype);
    const endIndex = caseInsensitiveDoc.indexOf(endStrOfDoctype);
    const doctypeStr = this.#$root.html().substring(startIndex, endIndex + 1);
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
const cheerio = require('cheerio');

class ScrappingManager {
  #$root = null;

  loadPage(webPage) {
    const document = cheerio.load(webPage);
    this.#$root = document.root().html();
  }

  getScrappedData() {
    return {
      htmlVersion: this.#htmlVersion,
    };
  }

  get #htmlVersion() {
    const startStrOfDoctype = '<!doctype';
    const endStrOfDoctype = '<html';
    const caseInsensitiveDoc = this.#$root.toLowerCase();
    const startIndex = caseInsensitiveDoc.indexOf(startStrOfDoctype);
    const endIndex = caseInsensitiveDoc.indexOf(endStrOfDoctype);
    const doctypeStr = this.#$root.substring(startIndex, endIndex + 1);
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
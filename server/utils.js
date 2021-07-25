function catchUnhandledRouteError(req, res, callback) {
  callback(req, res).catch(({ status = 500, error = 'Internal Server Error' }) => {
    res.status(status).json({ error });
  });
}

function mapDataToSingleStructure(data) {
  const { largest: largestImg, amount: imgAmount } = data.images;

  return {
    htmlVersion: [{
      label: 'HTML Version',
      value: data.htmlVersion
    }],
    title: [{
      label: 'Web-page title',
      value: data.title
    }],
    headings: Object.entries(data.headings)
      .map(([tag, amount]) => ({
        label: `Amount of ${tag}`,
        value: amount
      })),
    images: [
      {
        label: 'The largest image',
        value: largestImg.url,
      },
      {
        label: 'Dimensions of the largest image',
        value: `${largestImg.width}px x ${largestImg.height}px`
      },
      {
        label: 'Amount of images',
        value: imgAmount,
      }
    ],
    links: Object.entries(data.links).map(([type, amount]) => ({
      label: `Amount of ${type} links`,
      value: amount
    })),
    loadingTime: [{
      label: 'Loading time of the analyzed page',
      value: data.loadingTimeInSec
    }]
  };
}

module.exports = {
  catchUnhandledRouteError,
  mapDataToSingleStructure
}
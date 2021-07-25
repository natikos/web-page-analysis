function catchUnhandledRouteError(req, res, callback) {
  callback(req, res).catch(({ status = 500, error = 'Internal Server Error' }) => {
    res.status(status).json({ error });
  });
}

module.exports = {
  catchUnhandledRouteError
}
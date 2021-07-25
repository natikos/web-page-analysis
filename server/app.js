const express = require('express');
const cors = require('cors');

const { DEFAULT_PORT } = require('./constants');
const routeHandler = require('./service');
const { catchUnhandledRouteError } = require('./utils');

const PORT = process.env.PORT ?? DEFAULT_PORT;

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/', (_, response) => {
  response.send('Hello to web scrapping!');
});

app.get(
  '/info',
  ...routeHandler.getInfo.middlewares,
  (req, res) => catchUnhandledRouteError(req, res, routeHandler.getInfo.handler)
);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

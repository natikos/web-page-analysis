const express = require('express');

const { DEFAULT_PORT } = require('./constants');
const routeHandler = require('./service');

const PORT = process.env.PORT ?? DEFAULT_PORT;

const app = express();

app.use(express.json());

app.get('/', (_, response) => {
  response.send('Hello to web scrapping!');
});

app.get('/info', routeHandler.getInfo);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
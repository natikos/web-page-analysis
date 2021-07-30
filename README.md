# Web-Page Analysis

Web-Page Analysis is a node.js-based application that provides a basic analysis of a web-page.
Feel free to check out the steps (tickets) for building the application [here](https://github.com/natikos/web-page-analysis/projects/1)

## Installation & running

When in the root directory install dependecies in order to can install project by one command:
```javascript
yarn install
```

after installation is finished run script which install all dependencies for both front- & back-end sides:
```javascript
yarn app-prepare
```

after finishing installation run server and client apps:
```javascript
yarn start
```

## Limitations

The primary project implementation limitations are:
1. A relatively naive URL validation;
2. Long server wait time;
3. Inability to scrap a SPA;
4. Absence of essential tests. 

## Possible improvements
1. To make the application production-ready, it is essential to add at least unit tests. It is also recommended to configure three different environments (development, testing, and production) to safely roll out the final product and minimize the number of bugs. Adding CI/CD tools to ensure the quality of the final product and speed up the delivery process.
2. It is possible to use *CAPTCHA* or a similar test to prevent DoS and/or DDoS attacks to improve security of the application. We might also use proven third-party tools (e.g. [Sanitize URL](https://www.npmjs.com/package/@braintree/sanitize-url) NPM package) to sanitize potentially harmful links. Containerization might be used to isolate the application from the host system.
3. We might use `worker_threads` and `clusters` for performance optimization.
4. To improve the development process, we might use containerization to avoid any "It's working on my computer" situations. We can also use *pre-commit hooks* to force code style.

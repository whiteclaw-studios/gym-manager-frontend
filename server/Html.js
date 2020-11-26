import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from 'emotion-server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import routes from '../src/routes';
import { apiUrls } from './constants';
const path = require('path');
function Html({ store, url }) {
  let root = null;
  const state = store.getState();
  const assetsJson = require(path.join(
    __dirname.slice(0, -6) + 'public/assets.json',
  ));
  const vendorJs = assetsJson && assetsJson.vendors.js;
  const { NODE_ENV } = process.env;
  let npmModulesScripts = '';
  if (assetsJson) {
    Object.keys(assetsJson).map((key) => {
      if (key.includes('npm')) {
        console.log('file', assetsJson[key]);
        npmModulesScripts += `<script src="/${assetsJson[key]['js']}"></script>`;
      }
    });
  }
  const config = `window.apiUrls=JSON.parse('${JSON.stringify(apiUrls)}')`;

  // console.log('npmModulesScrips', npmModulesScripts);
  const initialState = `window.__INITIAL_STATE__ = ${JSON.stringify(
    state,
  )};window.NODE_ENV="${NODE_ENV}";`;
  try {
    root = renderStylesToString(
      renderToString(
        <Provider store={store}>
          <StaticRouter location={url} context={{}}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>,
      ),
    );
  } catch (err) {
    root = null;
  }
  return `<!doctype html>
  <html>
    <head>
      <title>Gym manager</title>
      <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, height=device-height, viewport-fit=cover"
    />
    <link rel='manifest' href='/manifest.json'>
    <meta name='mobile-web-app-capable' content='yes'>
    </head>
    <body>
    <script>${config}</script>
    <script>${initialState}</script>
    <div id="root">${root}</div>
    <script src="/bundle.js"></script>
    <script src="/${vendorJs}"></script>
    ${npmModulesScripts}
    <script>
      if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
          navigator.serviceWorker.register('/service-worker.js')
              .then((reg) => {
                console.log('Service worker registered.', reg);
              });
          });
      }
   </script>
    </body>
  </html>
    `;
}
export default Html;
// <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet">
// <link href="https://fonts.googleapis.com/css?family=Marck+Script|Montserrat:600&display=swap" rel="stylesheet">

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { createHistory } from 'history';
import { useRouterHistory, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import ThirdPart from 'shared/config/thirdPart';
import WebResourceLoaded from 'shared/config/webResourceLoaded';
import { AppRoot, AppRouter } from 'index/root';
import { configureStore } from 'index/store';

import './app.less';

if (__STATIC__) {
  /* eslint-disable */
  require('mockup');
  /* eslint-enable */
}

const runApp = () => {
  let history = useRouterHistory(createHistory)({
      // basename: window.__siteBaseName  || ""
  });
  let store = configureStore(window.__reduxInitialState || {}, history);
  const finalHistory = syncHistoryWithStore(history, store);
  if (!___SERVERRENDER___) {
    ReactDOM.render(
      <Provider store={store}>
        <AppRoot>
          <AppRouter history={finalHistory} />
        </AppRoot>
      </Provider>, document.getElementById('app-root'));

    ThirdPart();
    WebResourceLoaded();
  } else {
    global.serverRender = (path, originalConfig, siteBaseName) => {
      history = createMemoryHistory({
        // basename: siteBaseName || ''
      });
      history.push(path);
      window.__siteBaseName = siteBaseName;
      store = configureStore(JSON.parse(originalConfig), history);
      syncHistoryWithStore(history, store);
      return ReactDOMServer.renderToString(
        <Provider store={store}>
          <AppRoot>
            <AppRouter history={finalHistory} />
          </AppRoot>
        </Provider>);
    };
  }
};

/**
 * Since Safari doesn't yet have the Intl APIs(Chrome fully support, IE11 mostly support) built-in,
 * so need to add the standard Intl polyfill for Safari.
 * Issue link: https://github.com/yahoo/react-intl/issues/100
 * Solution link: http://formatjs.io/guides/runtime-environments/#client
 */
if (!window.Intl) {
  require.ensure([], (require) => {
    require('intl');
    require('intl/locale-data/jsonp/en.js');
    runApp();
  }, 'intl-polyfill');
} else {
  runApp();
}

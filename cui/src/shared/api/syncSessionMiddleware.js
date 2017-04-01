import { fromJS } from 'immutable';
import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';

import { SYNC_LEGENCY_CUI_SESSION } from 'shared/actions/syncSession';

const refreshSessionAPI = 'Shopping_Cart?refresh_session=true';

export default function syncSessionMiddleware() {
  return ({ dispatch, getState }) => {
    return next => action => {
      const { type, payload } = action;

      if (type === SYNC_LEGENCY_CUI_SESSION){
        if (__STATIC__ || ___TESTING___){
          return Promise.resolve();
        }

        const site = window.__siteBaseName ? window.__siteBaseName.replace(/\//, "") : "";
        const secureRecnet = getState().configurations.get('secure_recnet') ? "https" : "http";
        const cuiUrl = getState().configurations.get('cui_url');
        const url = `${secureRecnet}://${cuiUrl}/${site}/${refreshSessionAPI}`;

        return fetch(url, {
          credentials: 'include',
          method: 'get'
        }).then(
          (response = {}) => {
            const { status, statusText, ok } = response;
            if (ok) {
              console.log(
                [
                  `[Successed to refresh legency cui session] - `,
                  `After dispatch action ${type}.`
                ].join('')
              );
            } else {
              console.log(
                [
                  `[Failed to refresh legency cui session] - `,
                  `After dispatch action ${type}.`
                ].join('')
              );
            }
          },
          (error = {}) => {
            console.log(`[${error.stack}] - ${url}`);
          }
        );
      }

      return next(action);
    };
  };
}

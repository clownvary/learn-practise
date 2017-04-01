import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import serializeData from '../../shared/utils/serialize';

import parseResponse from './parseResponse';
import processHeaders, { CONTENTTYPE } from './headersService';

let interfaces;
let pathToRegexp;

if (__STATIC__) {
  /* eslint-disable */
  interfaces = require('./interfaces');
  pathToRegexp = require('path-to-regexp');
  /* eslint-enable */
}

// avoid warning when developer dosn't handle api error.
window.addEventListener('unhandledrejection', (e) => { e.preventDefault(); });

// TODO fallback to use ES5 to create a customize error, because
// accroding to to BABEL parse the error instanceof RequestError always return false
export function RequestError(payload, message) {
  Error.call(this, message);
  this.name = 'RequestError';
  this.message = message || 'Request Error';
  this.payload = payload;
}

RequestError.prototype = new Error();
RequestError.prototype.constructor = RequestError;

export default class API {
  constructor() {
    ['get', 'post', 'put', 'patch', 'delete', 'head'].forEach((method) => {
      this[method] = (path, {
        headers = {},
        body = undefined
      } = {}) => new Promise((resolve, reject) => {
        __STATIC__ && (body = undefined);

        const fetchConfig = {
          method: __STATIC__ ? 'get' : method,
          headers: processHeaders(headers),
          credentials: 'include'
        };

        let params = body;

        if (fetchConfig.headers['Content-Type'] !== CONTENTTYPE.json) {
          params = serializeData(body);
        }

        if (__STATIC__) {
          const pathMap = interfaces[method];
          if (pathMap) {
            const matchedPath = Object.keys(pathMap).filter((regPath) => {
              const reg = pathToRegexp(regPath, []);
              return !!reg.exec(path);
            });
            path = pathMap[matchedPath[0]];
          }
        } else {
          path = `${window.__siteBaseName}${path}`;
          if (method !== 'get' && method !== 'delete') {
            fetchConfig.body = JSON.stringify(params);
          } else {
            const paramsString = params ? `${params}&` : '';
            path = `${path}${path.indexOf('?') !== -1 ? '&' : '?'}${paramsString}ui_random=${new Date().getTime()}`;
          }
        }

        return fetch(path, fetchConfig).then(
          (response = {}) => {
            const { status, statusText, ok } = response;
            if (ok) {
              response.json().then(({ headers, body }) => {
                const success = parseResponse(headers);
                if (success) {
                  resolve({
                    payload: {
                      headers,
                      body
                    }
                  });
                } else {
                  reject(new RequestError({ headers, body }));
                }
              });
            } else {
              reject(new RequestError({
                headers: {
                  response_code: status,
                  response_message: statusText
                }
              }));
            }
          },
          (error = {}) => {
            // reject(error);
            reject(new RequestError({
              headers: {
                response_code: error.code,
                response_message: error.message
              }
            }));
          }
        );
      });
    });
  }
}

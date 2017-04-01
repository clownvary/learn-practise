import {addError} from '../actions/error';
import {showLoadingbar, hideLoadingbar} from '../actions/loadingBar';

import { RequestError } from './API';
import { isSystemError } from './parseResponse';
import requestCounter from './stateManager';

/**
 * Move it from AUI framework, include error and loading bar handle.
 * TODO: need to split out error and loading bar handle from here.
 */
export default function promiseMiddleware(API) {
  return ({dispatch, getState}) => {
    return next => action => {

      const { promise, types, ...rest } = action;
      if (!promise) {
        return next(action);
      }

      let ignoreBusinessErrors = false,
        ignoreLoadingbar = false,
        ignoreSystemErrors = false;

      if (action.meta) {
        ignoreBusinessErrors = !!action.meta.ignoreBusinessErrors;
        ignoreLoadingbar = !!action.meta.ignoreLoadingbar;
        ignoreSystemErrors = !!action.meta.ignoreSystemErrors;
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});

      if (!___TESTING___ && !ignoreLoadingbar) {
        // If this is the first living ajax call, we show the laoding bar
        if (requestCounter.isEmptyLivingRequest()) {
          dispatch(showLoadingbar());
        }

        // track every living ajax call.
        requestCounter.livingRequestCountUp();
      }

      const actionPromise = promise(API, dispatch, getState);
      actionPromise.then(({payload}) => {
        return next({...rest, payload, type: SUCCESS});
      }).catch((error)=> {
        if (error instanceof RequestError) {
          if (ignoreBusinessErrors) {
            if (isSystemError(error.payload.headers.response_code) && !ignoreSystemErrors) {
              next(addError({
                payload: {
                  code: error.payload.headers.response_code,
                  message: error.payload.headers.response_message
                }
              }));
            }
          } else {
            next(addError({
              payload: {
                code: error.payload.headers.response_code,
                message: error.payload.headers.response_message
              }
            }));
          }
        } else {
          next(addError({payload: {message: error.message}}));
        }

        next({...rest, error, type: FAILURE});

        return error;
      }).finally(()=> {
        if (!___TESTING___ && !ignoreLoadingbar) {
          // make sure the count down the livingRequest in another event loop
          // to handle we chain the ajax call.
          setTimeout(function () {
            // release the death ajax call.
            requestCounter.livingRequestCountDown();

            // if all the ajax call is death, we relase the loading bar
            if (requestCounter.isEmptyLivingRequest()) {
              dispatch(hideLoadingbar());
            }
          }, 0);
        }
      });

      return actionPromise;
    };
  };
}

'use strict';
import URL from '../urls';
import { addError } from './error';

export const FETCH_AUTHORITIES = 'FETCH_AUTHORITIES';
export const FETCH_AUTHORITIES_SUCESS = 'FETCH_AUTHORITIES_SUCESS';
export const FETCH_AUTHORITIES_FAILURE = 'FETCH_AUTHORITIES_FAILURE';

export function fetchAuthorities () {
  return {
    types: [FETCH_AUTHORITIES, FETCH_AUTHORITIES_SUCESS, FETCH_AUTHORITIES_FAILURE],
    promise: (API) => API.get(URL.authority)
  }
}

export function raiseUnrecognizedAuthCode(moduleName) {
  return (dispatch) => dispatch(addError(
    {
      payload: {
        message: `unrecognized authority type for ${moduleName}, please contract administrator.`
      }
    }));
}

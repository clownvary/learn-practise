import URL from '../urls';

export const FETCH_RUNNINGCART = "FETCH_RUNNINGCART";
export const FETCH_RUNNINGCART_SUCCESS = "FETCH_RUNNINGCART_SUCCESS";
export const FETCH_RUNNINGCART_FAILURE = "FETCH_RUNNINGCART_FAILURE";

export function fetchRunningCart(params) {

  return (dispatch, getState) => {
    dispatch(loadRunningCart({
      ...params
    }));
  }
}

export function loadRunningCart(params) {

  return {
    types: [FETCH_RUNNINGCART, FETCH_RUNNINGCART_SUCCESS, FETCH_RUNNINGCART_FAILURE],
    promise: (API) => API.get(URL.runningCart, {
      body: {
        ...params
      }
    })
  };
}

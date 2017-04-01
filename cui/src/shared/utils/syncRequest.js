import {processHeaders} from "shared/api/headersService";
import serializeData from "./serialize";

function setHeaders(xhr, headers = {}) {
  headers = processHeaders(headers);
  Object.keys(headers).forEach(function (name) {
    (headers[name] && xhr.setRequestHeader(name, headers[name]));
  })
}

function onloadHandler(xhr, onsuccess, onerror) {
  return () => {
    let statusCode = xhr.status;
    if (statusCode >= 200 && statusCode < 300) {
      if (typeof onsuccess === 'function') {
        onsuccess.apply(xhr, parseResponse(xhr));
      }
    } else {
      if (typeof onerror === 'function') {
        onerror.apply(xhr, parseResponse(xhr));
      }
    }
  }
}

function onerrorHandler(xhr, onerror) {
  return () => {
    if (typeof onerror === 'function') {
      onerror.apply(xhr, parseResponse(xhr));
    } else {
      console.log(new TypeError('Network request failed'));
    }
  }
}

function parseResponse(xhr) {
  let result;
  try {
    result = JSON.parse(xhr.responseText);
  } catch (e) {
    result = xhr.responseText;
  }
  return [result, xhr]
}

export default function(options = {}) {
  let {method = "GET", url, headers, body = {}, onsuccess, onerror, withCredentials = false} = options;

  let xhr = new XMLHttpRequest();
  xhr.open(method, url, false);
  setHeaders(xhr, headers);

  if (withCredentials) {
    xhr.withCredentials = true;
  };

  xhr.onload = onloadHandler(xhr, onsuccess, onerror);

  xhr.onerror = onerrorHandler(xhr, onerror);
  //Note: You may not use a timeout for synchronous requests with an owning window.(https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
  xhr.send(serializeData(body));
};
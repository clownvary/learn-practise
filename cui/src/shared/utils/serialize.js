function isObject(data) {
  return Object.prototype.toString.call(data) === '[object Object]';
}

function isArray(data) {
  return Object.prototype.toString.call(data) === '[object Array]';
}

function getQueryString(object) {
  return Object.keys(object).reduce(function (acc, item) {
    var prefix = !acc ? '' : acc + '&';
    return prefix + encode(item) + '=' + (isArray(object[item]) ? encode(JSON.stringify(object[item])) : encode(object[item]));
  }, '');
}

function encode(value) {
  return encodeURIComponent(value);
}

export default function serializeData(data) {
  return isObject(data) ? getQueryString(data) : data;
}

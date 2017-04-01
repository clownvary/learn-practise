// refer to the ActiveNet/ActiveNetServlet/src/com.activenet.web.configurations;

export const NO_RESULT = '0001'; // body needed
const SUCCESS = '0000';

const handlers = {
  [SUCCESS]() {
    return true;
  },

  [NO_RESULT]() { // Do not take it as system error in front-end.
    return true;
  }
};

export default function (headers) {
  const responseCode = headers.response_code;

  if (handlers[responseCode]) {
    return handlers[responseCode](headers);
  }

  return false;
}

export function isSystemError(responseCode) {
  const code = parseInt(responseCode, 10);

  return (code && (code < 1000 || code === 9999));
}

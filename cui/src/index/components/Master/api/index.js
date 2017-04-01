import { HttpMethodEnum, createAPI } from 'react-base-ui/lib/restClient';

const apiSet = {};

const path = `${window.__siteBaseName}`;
apiSet.getCartCount = createAPI(HttpMethodEnum.GET, `${path}/cartCount`);


if (__STATIC__) {
  const testPath = '/test/json/common';

  apiSet.getCartCount = apiSet.getCartCount.mock(`${testPath}/get_cartcount.json`);
}

export default apiSet;

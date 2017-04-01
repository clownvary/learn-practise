import { HttpMethodEnum, createAPI } from 'react-base-ui/lib/restClient';

const path = `${window.__siteBaseName}`;


const apiSet = {};

apiSet.needPay = createAPI(HttpMethodEnum.GET, `${path}/needpay`);
apiSet.checkout = createAPI(HttpMethodEnum.POST, `${path}/checkout`);
apiSet.getQuickDonation = createAPI(HttpMethodEnum.GET, `${path}/donations`);
apiSet.setQuickDonation = createAPI(HttpMethodEnum.POST, `${path}/donations`);
apiSet.getTransactions = createAPI(HttpMethodEnum.GET, `${path}/transactions`);
apiSet.deleteTransaction = createAPI(HttpMethodEnum.DELETE, `${path}/transactions/{{id}}`);
apiSet.getWaivers = createAPI(HttpMethodEnum.GET, `${path}/waivers`);

if (__STATIC__) {
  const testPath = '/test/json/Cart/ShoppingCart';

  apiSet.needPay = apiSet.needPay.mock(`${testPath}/get_needpay.json`);
  apiSet.checkout = apiSet.checkout.mock(`${testPath}/post_checkout.json`);
  apiSet.getQuickDonation = apiSet.getQuickDonation.mock(`${testPath}/get_quickdonation.json`);
  apiSet.setQuickDonation = apiSet.setQuickDonation.mock(`${testPath}/post_quickdonation.json`);
  apiSet.getTransactions = apiSet.getTransactions.mock(`${testPath}/get_transactions.json`);
  apiSet.deleteTransaction = apiSet.deleteTransaction.mock(`${testPath}/delete_transaction.json`);
  apiSet.getWaivers = apiSet.getWaivers.mock(`${testPath}/get_waivers.json`);
}

export default apiSet;

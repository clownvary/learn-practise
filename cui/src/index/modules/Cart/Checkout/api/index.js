import { HttpMethodEnum, createAPI } from 'react-base-ui/lib/restClient';

const checkoutPath = `${window.__siteBaseName}/checkout`;
const systemPath = `${window.__siteBaseName}/system`;
const transctionsPath = `${window.__siteBaseName}/transactions`;

const apiSet = {};

apiSet.getCountryState = createAPI(HttpMethodEnum.GET, `${systemPath}/countries`);
apiSet.getBillingAddress = createAPI(HttpMethodEnum.GET, `${checkoutPath}/billing`);
apiSet.createBillingAddress = createAPI(HttpMethodEnum.POST, `${checkoutPath}/billing`);
apiSet.updateBillingAddress = createAPI(HttpMethodEnum.PUT, `${checkoutPath}/billing`);

apiSet.changePayer = createAPI(HttpMethodEnum.POST, `${checkoutPath}/payer/selection`);

apiSet.getCreditCardTypes = createAPI(HttpMethodEnum.GET, `${checkoutPath}/creditcardtypes`);
apiSet.getSavedCreditCards = createAPI(HttpMethodEnum.GET, `${checkoutPath}/creditcards?types={{types}}`);
apiSet.getSavedEChecks = createAPI(HttpMethodEnum.GET, `${checkoutPath}/echecks`);
apiSet.getAMSToken = createAPI(HttpMethodEnum.GET, `${checkoutPath}/amstoken`);
apiSet.getAMSAccountId = createAPI(HttpMethodEnum.GET, `${checkoutPath}/amsaccountid`);
apiSet.saveCreditCard = createAPI(HttpMethodEnum.POST, `${checkoutPath}/creditcards`);

apiSet.getOrderSummary = createAPI(HttpMethodEnum.GET, `${transctionsPath}/summary`);


if (__STATIC__) {
  const testPath = '/test/json/Cart/Checkout';

  apiSet.getCountryState = apiSet.getCountryState.mock(`${testPath}/get_countrystates.json`);

  apiSet.getBillingAddress = apiSet.getBillingAddress.mock(`${testPath}/get_billingaddresses.json`);
  apiSet.createBillingAddress = apiSet.createBillingAddress.mock(`${testPath}/post_createbillingaddress.json`);
  apiSet.updateBillingAddress = apiSet.updateBillingAddress.mock(`${testPath}/post_updatebillingaddress.json`);

  apiSet.changePayer = apiSet.changePayer.mock(`${testPath}/post_changepayer.json`);

  apiSet.getCreditCardTypes = apiSet.getCreditCardTypes.mock(`${testPath}/get_creditcardtypes.json`);
  apiSet.getSavedCreditCards = apiSet.getSavedCreditCards.mock(`${testPath}/get_creditcards.json`);
  apiSet.getSavedEChecks = apiSet.getSavedEChecks.mock(`${testPath}/get_echecks.json`);
  apiSet.getAMSToken = apiSet.getAMSToken.mock(`${testPath}/get_amstoken.json`);
  apiSet.getAMSAccountId = apiSet.getAMSAccountId.mock(`${testPath}/get_amsaccountid.json`);
  apiSet.saveCreditCard = apiSet.saveCreditCard.mock(`${testPath}/post_creditcards.json`);

  apiSet.getOrderSummary = apiSet.getOrderSummary.mock(`${testPath}/get_ordersummary.json`);
}

export default apiSet;

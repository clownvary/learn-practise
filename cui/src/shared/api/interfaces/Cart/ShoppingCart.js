import "Cart/ShoppingCart/get_transactions.json";
import "Cart/ShoppingCart/delete_transaction.json";
import "Cart/ShoppingCart/get_quickdonation.json";
import "Cart/ShoppingCart/post_quickdonation.json";
import "Cart/ShoppingCart/get_waivers.json";
import "Cart/ShoppingCart/get_needpay.json";
import "Cart/ShoppingCart/post_checkout.json";

const PREFIX = "/test/json/Cart/ShoppingCart";

export default  {
  "get": {
    "/donations": `${PREFIX}/get_quickdonation.json`,
    "/transactions": `${PREFIX}/get_transactions.json`,
    "/waivers": `${PREFIX}/get_waivers.json`,
    "/needpay": `${PREFIX}/get_needpay.json`
  },
  "post": {
    "/donations": `${PREFIX}/post_quickdonation.json`,
    "/checkout": `${PREFIX}/post_checkout.json`
  },
  "put": {

  },
  "patch": {

  },
  "delete": {
    "/transactions/:id": `${PREFIX}/delete_transaction.json`
  },
  "head": {

  }
}

import React from 'react';
import { Router, IndexRoute, Route } from 'react-router';

import { Master, NotFound, NoSiteFound } from 'index/components/';
import * as Cart from 'index/modules/Cart';

import selfMessages from './translations';

export default class AppRouter extends React.Component {

  static contextTypes = {
    getWording: React.PropTypes.func,
    systemSettings: React.PropTypes.object
  }

  static propTypes = {
    history: React.PropTypes.shape({})
  }

  static defaultProps = {}

  render() {
    const { history } = this.props;
    const { getWording, systemSettings } = this.context;
    const homeUrl = `${systemSettings.get('original_base_url')}/Home`;

    return (
      <Router history={history}>
        <Route
          path={`${window.__siteBaseName}`}
          component={Master}
          breadcrumbOptions={{ name: 'Home', href: homeUrl }}
        >
          <IndexRoute component={NotFound} status={404} />

          {/* Routes requiring Shopping Cart module start */ }
          <Route
            path="newcart"
            component={Cart.default}
            breadcrumbOptions={{ name: getWording('shopping_cart_label') }}
            pageHeaderOptions={{ title: getWording('shopping_cart_label'), specificContentId: 'page_newcuishoppingcart_header' }}
          >
            <IndexRoute component={Cart.ShoppingCart} />
            <Route
              path="checkout"
              breadcrumbOptions={{ name: 'Check Out' }}
              pageHeaderOptions={{ title: selfMessages.checkoutTitle, specificContentId: 'page_newcuicheckout_header' }}
            >
              <IndexRoute component={Cart.Checkout} />
              <Route
                path="confirmation"
                breadcrumbOptions={{ name: 'Confirmation', hideIndex: [1, 2] }}
                pageHeaderOptions={{ title: selfMessages.confirmationTitle }}
                component={Cart.Confirmation}
              />
            </Route>
          </Route>
          {/* Routes requiring Shopping Cart module end */ }
          <Route path="*" component={NotFound} status={404} />
        </Route>
        <Route path="*" component={NoSiteFound} status={404} />
      </Router>
    );
  }
}

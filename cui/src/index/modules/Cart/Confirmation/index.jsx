import React from 'react';
import { Link } from 'shared/components/Link';
import UIComponent from 'shared/components/UIComponent';

export default class Confirmation extends UIComponent {

  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/newcart">Shopping cart page</Link>
          </li>
          <li>
            <Link to="/newcart/checkout">Checkout page</Link>
          </li>
          <li>
            <Link to="/newcart/checkout/confirmation">Confirmation page</Link>
          </li>
        </ul>
      </div>
    );
  }
}


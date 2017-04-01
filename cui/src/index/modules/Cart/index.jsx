import React from 'react';
import ShoppingCart from './ShoppingCart/';
import Checkout from './Checkout/';
import Confirmation from './Confirmation/';

export {
  ShoppingCart,
  Checkout,
  Confirmation
};

export default class Cart extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  }

  static defaultProps = {};

  render() {
    return (
      <div className="cui-page-wrap">
        { this.props.children }
      </div>
    );
  }

}


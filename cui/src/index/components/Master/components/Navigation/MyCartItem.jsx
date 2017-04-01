import radium from 'radium';
import React from 'react';
import { Link } from 'shared/components/Link';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import BaseItem from './BaseItem';

export class MyCartItem extends BaseItem {
  render() {
    const { getWording } = this.context;
    const { item, itemStyles, cartCount } = this.props;
    const wording = getWording('my_cart_label');

    return (
      <li style={itemStyles.navItem} className="mycart">
        <Link to={item.get('url')} activeStyle={itemStyles.active} activeClassName="active">
          <span className="icon icon-uniF07A" />
          <FormattedDyncMessage value={wording || item.get('title')} />
          { cartCount ? ` (${cartCount})` : '' }
        </Link>
      </li>
    );
  }
}

export default radium(MyCartItem);

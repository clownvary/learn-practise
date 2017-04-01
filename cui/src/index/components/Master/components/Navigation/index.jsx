import radium from 'radium';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchShoppingCartCountAction } from 'index/components/Master/actions';

import { getNavBarClass, getNavBarStyles, getNavItemStyles } from 'shared/styles/themes/customize';
import 'shared/styles/themes/index.less';
import 'shared/styles/themes/greenGray.less';
import 'shared/styles/themes/orangeYellow.less';
import 'shared/styles/themes/orangeGray.less';
import 'shared/styles/themes/greenYellow.less';

import HomeItem from './HomeItem';
import ActivitiesItem from './ActivitiesItem';
import CalendarItem from './CalendarItem';
import MyCartItem from './MyCartItem';
import NormalItem from './NormalItem';

export class Navigation extends Component {

  static contextTypes = {
    systemSettings: React.PropTypes.object,
    theme: React.PropTypes.object
  }

  static propTypes = {
    cartCount: React.PropTypes.number,
    fetchShoppingCartCountAction: React.PropTypes.func
  }

  componentDidMount() {
    this.props.fetchShoppingCartCountAction();
  }

  generateNavItems() {
    const { systemSettings, theme } = this.context;
    const menus = systemSettings.getIn(['navigation', 'menus']);

    return menus.map(((item, i) => {
      const properties = {
        item,
        itemStyles: getNavItemStyles(theme)
      };
      switch (item.get('title')) {
        case 'Home':
          return <HomeItem key={i} {...properties} />;
        case 'Activities':
          return <ActivitiesItem key={i} {...properties} />;
        case 'Calendar':
          return <CalendarItem key={i} {...properties} />;
        case 'MyCart':
          return <MyCartItem key={i} {...properties} cartCount={this.props.cartCount} />;
        default:
          return <NormalItem key={i} {...properties} />;
      }
    }));
  }

  render() {
    const { theme } = this.context;

    return (
      <div className="cui-navigation-wrap">
        <div className="cui-navigation">
          <ul className={getNavBarClass(theme)} style={getNavBarStyles(theme)}>
            { this.generateNavItems() }
            <li className="placeholder" />
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    cartCount: state.master.get('cartCount')
  }), {
    fetchShoppingCartCountAction
  }
)(radium(Navigation));

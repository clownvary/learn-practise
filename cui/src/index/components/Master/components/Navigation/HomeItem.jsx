import React from 'react';
import radium from 'radium';
import NetCUILink from 'shared/components/NetCUILink';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import BaseItem from './BaseItem';

export class HomeItem extends BaseItem {

  render() {
    const { getWording } = this.context;
    const { item, itemStyles } = this.props;
    const wording = getWording('online_intro_label');

    return (
      <li style={itemStyles.navItem}>
        <NetCUILink href={item.get('url')}>
          <FormattedDyncMessage value={wording || item.get('title')} />
        </NetCUILink>
      </li>
    );
  }
}

export default radium(HomeItem);

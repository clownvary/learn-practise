import radium from 'radium';
import React from 'react';
import NetCUILink from 'shared/components/NetCUILink';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import BaseItem from './BaseItem';

export class NormalItem extends BaseItem {

  render() {
    const { getWording } = this.context;
    const { item, itemStyles } = this.props;

    return (
      <li style={itemStyles.navItem}>
        <NetCUILink href={item.get('url')}>
          { (() => {
            let itemWording = null;
            switch (item.get('title')) {
              case 'Facilities':
                itemWording = getWording('online_facilities_label');
                break;
              case 'Membership':
                itemWording = getWording('online_memberships_lable');
                break;
              case 'Leagues':
                itemWording = getWording('online_sports_lable');
                break;
              case 'Donation':
                itemWording = getWording('online_donations_lable');
                break;
              case 'GiftCertificates':
                itemWording = getWording('gift_certificate_label');
                break;
              default:
                itemWording = null;
                break;
            }
            return (
              <FormattedDyncMessage value={itemWording || (item.get('title') ? item.get('title') : '')} />
            );
          })() }
        </NetCUILink>
      </li>
    );
  }

}


export default radium(NormalItem);
